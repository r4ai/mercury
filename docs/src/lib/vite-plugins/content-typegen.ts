import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { evaluate } from "@mdx-js/mdx"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import type { Plugin } from "vite"

type GenerateOptions = {
  /** Absolute path to docs root (Vite `config.root`) */
  rootDir: string
}

type Entry = {
  segments: string[]
  id: string
  importPath: string
  metadata: unknown
}

const CONTENT_RELATIVE_DIR = "src/content"
const CONTENT_DOCS_SUBDIR = "docs"
const OUTPUT_FILE = path.join(CONTENT_RELATIVE_DIR, "content.gen.ts")
const METADATA_IMPORT_PATTERN = /from\s+["']@\/lib\/docs\/content-module["']/g
const METADATA_FALLBACK_CODE =
  "export const defineDocsMetadata = (metadata) => metadata;"
const METADATA_FALLBACK_MODULE_URL = `data:text/javascript,${encodeURIComponent(
  METADATA_FALLBACK_CODE,
)}`

const readAllMdxFiles = async (dir: string): Promise<string[]> => {
  const out: string[] = []
  const walk = async (d: string): Promise<void> => {
    const entries = await fs.readdir(d, { withFileTypes: true })
    await Promise.all(
      entries.map(async (entry) => {
        // skip hidden folders like .git, .DS_Store, etc.
        if (entry.name.startsWith(".")) return
        const full = path.join(d, entry.name)
        if (entry.isDirectory()) {
          await walk(full)
        } else if (
          entry.isFile() &&
          entry.name.toLowerCase().endsWith(".mdx")
        ) {
          out.push(full)
        }
      }),
    )
  }
  try {
    await walk(dir)
  } catch {
    // ignore if directory does not exist yet
  }
  return out.sort()
}

const toSlugSegments = (file: string, base: string): string[] => {
  const rel = path.relative(base, file)
  const parts = rel.split(path.sep)
  if (parts.length === 0) return []
  const last = parts[parts.length - 1]
  if (last == null) return [] // type guard
  if (last.toLowerCase() === "index.mdx") {
    // drop trailing index.mdx
    return parts.slice(0, -1)
  }
  const withoutExt = last.replace(/\.mdx$/i, "")
  return [...parts.slice(0, -1), withoutExt]
}

const buildStaticPaths = (entries: Entry[]) => {
  const files = entries.map((e) => e.segments)
  const filesSet = new Set<string>(files.map((file) => JSON.stringify(file)))

  const dirsSet = new Set<string>()
  for (const file of files) {
    if (file.length < 2) continue
    for (let i = 1; i < file.length; i++) {
      const dir = file.slice(0, i)
      dirsSet.add(JSON.stringify(dir))
    }
  }

  const pathsSet = filesSet.union(dirsSet)
  const paths = [[], ...[...pathsSet].map((p): string[] => JSON.parse(p))]

  return paths.sort(
    (a, b) => a.length - b.length || a.join("/").localeCompare(b.join("/")),
  )
}

const renderMetadataProperty = (metadata: unknown): string => {
  if (metadata == null) return "    metadata: undefined,"

  const json = JSON.stringify(metadata, null, 2)
  const lines = json.split("\n")
  if (lines.length === 0) {
    return "    metadata: undefined,"
  }

  if (lines.length === 1) {
    return `    metadata: ${lines[0]},`
  }

  const first = lines[0]
  const last = lines[lines.length - 1]
  const middle = lines
    .slice(1, -1)
    .map((line) => `      ${line}`)
    .join("\n")

  return [`    metadata: ${first}`, middle, `    ${last},`]
    .filter((part) => part.length > 0)
    .join("\n")
}

const createMetadataHelperModuleUrl = async (rootDir: string) => {
  const helperPath = path.join(
    rootDir,
    "src",
    "lib",
    "docs",
    "content-module.ts",
  )

  try {
    await fs.access(helperPath)
    return pathToFileURL(helperPath).href
  } catch (error) {
    console.warn(
      `[content-typegen] Unable to load docs metadata helper from ${helperPath}:`,
      error,
    )
    return METADATA_FALLBACK_MODULE_URL
  }
}

const loadContentMetadata = async (
  absPath: string,
  helperModuleUrl: string,
): Promise<unknown> => {
  let source: string
  try {
    source = await fs.readFile(absPath, "utf8")
  } catch (error) {
    console.warn(
      `[content-typegen] Failed to read docs content file ${absPath}:`,
      error,
    )
    return undefined
  }

  if (!source.includes("export const metadata")) return undefined

  const evaluateWithHelper = async (moduleUrl: string, logError: boolean) => {
    const patchedSource = source.replace(
      METADATA_IMPORT_PATTERN,
      `from "${moduleUrl}"`,
    )

    try {
      const evaluated = await evaluate(
        { value: patchedSource, path: absPath },
        {
          baseUrl: pathToFileURL(absPath),
          Fragment,
          jsx,
          jsxs,
        },
      )

      return {
        ok: true as const,
        metadata: (evaluated as { metadata?: unknown }).metadata,
      }
    } catch (error) {
      if (logError) {
        console.warn(
          `[content-typegen] Failed to evaluate metadata for ${absPath}:`,
          error,
        )
      }
      return { ok: false as const }
    }
  }

  const primary = await evaluateWithHelper(helperModuleUrl, true)
  if (primary.ok) return primary.metadata

  if (helperModuleUrl === METADATA_FALLBACK_MODULE_URL) return undefined

  const fallback = await evaluateWithHelper(METADATA_FALLBACK_MODULE_URL, false)
  return fallback.ok ? fallback.metadata : undefined
}

const generateContent = async ({
  rootDir,
}: GenerateOptions): Promise<string> => {
  const contentDir = path.join(rootDir, CONTENT_RELATIVE_DIR)
  const docsDir = path.join(contentDir, CONTENT_DOCS_SUBDIR)
  const files = await readAllMdxFiles(docsDir)
  const metadataHelperModuleUrl = await createMetadataHelperModuleUrl(rootDir)

  const entries: Entry[] = (
    await Promise.all(
      files.map(async (abs) => {
        const segments = toSlugSegments(abs, docsDir)
        if (segments.length === 0) return null
        const id = segments.join("/")
        const relFromContent = path.relative(contentDir, abs)
        const posixRel = relFromContent.split(path.sep).join("/")
        const importPath = `./${posixRel}`
        const metadata = await loadContentMetadata(abs, metadataHelperModuleUrl)
        return { segments, id, importPath, metadata }
      }),
    )
  )
    .filter((entry): entry is Entry => !!entry)
    .sort((a, b) => a.id.localeCompare(b.id))

  const staticPaths = buildStaticPaths(entries)

  const banner = [
    "// deno-fmt-ignore-file",
    "// biome-ignore format: generated types do not need formatting",
    "// prettier-ignore",
  ].join("\n")

  const docsRoutes = entries
    .map((entry) => {
      const url = `/${CONTENT_DOCS_SUBDIR}/${entry.id}`
      const metadataBlock = renderMetadataProperty(entry.metadata)
      return `  ${JSON.stringify(entry.id)}: {\n    id: ${JSON.stringify(entry.id)},\n    slugs: ${JSON.stringify(entry.segments)} as const,\n    url: ${JSON.stringify(url)},\n${metadataBlock}\n  },`
    })
    .join("\n")

  const docsRouteIds = entries
    .map((entry) => `  ${JSON.stringify(entry.id)},`)
    .join("\n")

  const switchCases = entries
    .map(
      (e) =>
        `    case ${JSON.stringify(e.id)}:\n      return import(${JSON.stringify(e.importPath)});`,
    )
    .join("\n")

  const code = `${banner}
export const staticPaths = ${JSON.stringify(staticPaths, null, 2)} as const

export type StaticPath = (typeof staticPaths)[number]

export const getContent = (slugs: StaticPath) => {
  const id = slugs.join("/")
  switch (id) {
${switchCases}
    default:
      return undefined
  }
}

export const docsRoutes = {
${docsRoutes}
} as const

export type DocsRouteId = keyof typeof docsRoutes
export type DocsRoute = (typeof docsRoutes)[DocsRouteId]

export const docsRouteIds = [
${docsRouteIds}
] as const

export const getDocsRoute = (slugs: StaticPath) => {
  const id = slugs.join("/")
  return id.length === 0 ? undefined : docsRoutes[id as DocsRouteId]
}
`
  return code
}

const ensureWriteFile = async (
  absPath: string,
  content: string,
): Promise<void> => {
  await fs.mkdir(path.dirname(absPath), { recursive: true })
  let prev = null as string | null
  try {
    prev = await fs.readFile(absPath, "utf8")
  } catch {
    // ignore missing file
  }
  if (prev === content) return
  await fs.writeFile(absPath, content, "utf8")
}

export const contentTypegenPlugin = (): Plugin => {
  let rootDir = ""
  let outputAbs = ""

  const runGenerate = async (): Promise<void> => {
    if (!rootDir) return
    const code = await generateContent({ rootDir })
    await ensureWriteFile(outputAbs, code)
  }

  return {
    name: "vite-plugin-content-typegen",
    configResolved: (config) => {
      rootDir = config.root ?? process.cwd()
      outputAbs = path.join(rootDir, OUTPUT_FILE)
    },
    buildStart: async () => {
      await runGenerate()
    },
    configureServer: (server) => {
      const contentDocsAbs = path.join(
        rootDir,
        CONTENT_RELATIVE_DIR,
        CONTENT_DOCS_SUBDIR,
      )
      server.watcher.add(contentDocsAbs)
      const onFsEvent = async (): Promise<void> => {
        await runGenerate()
      }
      server.watcher.on("add", onFsEvent)
      server.watcher.on("unlink", onFsEvent)
      server.watcher.on("change", (file) => {
        if (file.toLowerCase().endsWith(".mdx")) void onFsEvent()
      })
    },
    // Ensure file exists for prod builds too
    closeBundle: async () => {
      await runGenerate()
    },
  }
}

export default contentTypegenPlugin
