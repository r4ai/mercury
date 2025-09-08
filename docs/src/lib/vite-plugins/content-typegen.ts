import fs from "node:fs/promises"
import path from "node:path"
import type { Plugin } from "vite"

type GenerateOptions = {
  /** Absolute path to docs root (Vite `config.root`) */
  rootDir: string
}

const CONTENT_RELATIVE_DIR = "src/content"
const CONTENT_DOCS_SUBDIR = "docs"
const OUTPUT_FILE = path.join(CONTENT_RELATIVE_DIR, "content.gen.ts")

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
  const last = parts[parts.length - 1]!
  if (last.toLowerCase() === "index.mdx") {
    // drop trailing index.mdx
    return parts.slice(0, -1)
  }
  const withoutExt = last.replace(/\.mdx$/i, "")
  return [...parts.slice(0, -1), withoutExt]
}

const generateContent = async ({
  rootDir,
}: GenerateOptions): Promise<string> => {
  const contentDir = path.join(rootDir, CONTENT_RELATIVE_DIR)
  const docsDir = path.join(contentDir, CONTENT_DOCS_SUBDIR)
  const files = await readAllMdxFiles(docsDir)

  type Entry = { segs: string[]; id: string; importPath: string }
  const entries: Entry[] = files
    .map((abs) => {
      const segs = toSlugSegments(abs, docsDir)
      if (segs.length === 0) return null
      const id = segs.join("/")
      const relFromContent = path.relative(contentDir, abs)
      const posixRel = relFromContent.split(path.sep).join("/")
      const importPath = `./${posixRel}`
      return { segs, id, importPath }
    })
    .filter((e): e is Entry => !!e)
    .sort((a, b) => a.id.localeCompare(b.id))

  const staticPaths = entries.map((e) => e.segs)

  const banner = [
    "// deno-fmt-ignore-file",
    "// biome-ignore format: generated types do not need formatting",
    "// prettier-ignore",
  ].join("\n")

  const switchCases = entries
    .map(
      (e) =>
        `    case ${JSON.stringify(e.id)}:\n      return import(${JSON.stringify(e.importPath)});`,
    )
    .join("\n")

  const code = `${banner}
export const staticPaths = ${JSON.stringify(staticPaths)} as const

export type StaticPath = (typeof staticPaths)[number]

export const getContent = (slugs: StaticPath) => {
  const id = slugs.join("/")
  switch (id) {
${switchCases}
    default:
      throw new Error(\`Unknown content id: \${id}\`)
  }
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
