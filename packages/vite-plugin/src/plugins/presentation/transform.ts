import * as babelParser from "@babel/parser"
import * as recast from "recast"

const b = recast.types.builders

/**
 * Builds a JSX element.
 * @param name The name of the element.
 * @param attributes The attributes of the element.
 * @param children The children of the element.
 * @returns The constructed JSX element.
 */
const buildJsxElement = (
  name: recast.types.namedTypes.JSXOpeningElement["name"],
  attributes: recast.types.namedTypes.JSXOpeningElement["attributes"],
  children: recast.types.namedTypes.JSXElement[],
) => {
  const selfClosing = children.length === 0
  return b.jsxElement(
    b.jsxOpeningElement(name, attributes, selfClosing),
    selfClosing ? null : b.jsxClosingElement(name),
    children,
  )
}

/**
 * Builds a props object pattern for a function parameter.
 * @param props The properties to include in the object pattern.
 * @returns An array containing the object pattern.
 *
 * @example
 * buildProps({ components: b.identifier("components") }) // { components }
 */
const buildProps = (
  props: Record<string, recast.types.namedTypes.Property["value"] | undefined>,
) => {
  const pattern = b.objectPattern(
    Object.entries(props).map(([key, value]) => {
      const prop = b.property(
        "init",
        b.identifier(key),
        value === undefined ? b.identifier(key) : value,
      )
      prop.shorthand =
        prop.value.type === "Identifier" && prop.value.name === key
      return prop
    }),
  )
  return pattern
}

/**
 * Prepends an import declaration to the AST if it doesn't already exist.
 * @param ast The AST to modify.
 * @param from The module to import from.
 * @param imported The name of the imported identifier.
 */
const prependImport = (
  ast: recast.types.namedTypes.Program,
  from: string,
  imported: string,
) => {
  let hasImported = false

  recast.visit(ast, {
    visitImportDeclaration(path) {
      if (path.node.source.value === from) {
        const specifier = path.node.specifiers?.find(
          (s) =>
            s.type === "ImportSpecifier" &&
            s.imported.type === "Identifier" &&
            s.imported.name === imported,
        )
        if (specifier) {
          hasImported = true
        } else {
          path.node.specifiers?.push(b.importSpecifier(b.identifier(imported)))
          hasImported = true
        }
      }
      return false
    },
  })

  if (!hasImported) {
    const importDecl = b.importDeclaration(
      [b.importSpecifier(b.identifier(imported))],
      b.stringLiteral(from),
    )
    ast.body.unshift(importDecl)
  }
}

export const transformPresentationCode = (code: string) => {
  const ast: recast.types.namedTypes.File = recast.parse(code, {
    parser: {
      parse(source: string) {
        return babelParser.parse(source, {
          sourceType: "module",
          plugins: ["jsx", "typescript"],
        })
      },
    },
  })
  const program = ast.program

  // Don't export default MDXContent
  // export default function MDXContent() { ... }
  // => function MDXContent() { ... }
  recast.visit(program, {
    visitExportDefaultDeclaration(path) {
      const decl = path.node.declaration
      // If it's a declaration (e.g. function), keep the declaration and drop the default export
      if (
        decl.type === "FunctionDeclaration" ||
        decl.type === "ClassDeclaration"
      ) {
        path.replace(decl)
      } else {
        // e.g. `export default MDXContent` -> remove the export default statement
        path.prune()
      }
      return false
    },
  })

  // Add import for Presentation
  // import { Presentation } from "@mercurymd/react";
  prependImport(program, "@mercurymd/react", "Presentation")

  // Add new default export function
  // export default ({ components }) => <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />;
  const body = buildJsxElement(
    b.jsxIdentifier("Presentation"),
    [
      b.jsxAttribute(
        b.jsxIdentifier("Content"),
        b.jsxExpressionContainer(b.identifier("MDXContent")),
      ),
      b.jsxAttribute(
        b.jsxIdentifier("slidesLength"),
        b.jsxExpressionContainer(b.identifier("MERCURY_SLIDES_LENGTH")),
      ),
      b.jsxAttribute(
        b.jsxIdentifier("components"),
        b.jsxExpressionContainer(b.identifier("components")),
      ),
    ],
    [],
  )
  const props = buildProps({ components: b.identifier("components") })
  const fn = b.arrowFunctionExpression([props], body)
  program.body.push(b.exportDefaultDeclaration(fn))

  // Generate the transformed code
  const transformed = recast.print(program)

  return transformed
}
