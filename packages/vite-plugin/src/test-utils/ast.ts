import * as babelParser from "@babel/parser"
import * as recast from "recast"

export const stripLoc = (node: recast.types.ASTNode) => {
  recast.visit(node, {
    visitNode(path) {
      delete path.node.loc
      if ("start" in path.node) delete path.node.start
      if ("end" in path.node) delete path.node.end
      this.traverse(path)
      return false
    },
  })
  return node
}

export const parseProgram = (code: string) => {
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
  return stripLoc(ast.program)
}

export const parseExpression = (code: string) => {
  const ast: recast.types.namedTypes.Expression = recast.parse(code, {
    parser: {
      parse(source: string) {
        return babelParser.parseExpression(source, {
          sourceType: "module",
          plugins: ["jsx", "typescript"],
        })
      },
    },
  })
  return stripLoc(ast)
}

export const parseStatement = (code: string) => {
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
  return stripLoc(ast.program.body[0])
}

export const program = (code: string) => recast.print(parseProgram(code)).code
export const statement = (code: string) =>
  recast.print(parseStatement(code)).code
export const expression = (code: string) =>
  recast.print(parseExpression(code)).code
