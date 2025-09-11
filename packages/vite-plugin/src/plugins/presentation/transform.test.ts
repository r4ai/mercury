import dedent from "dedent"
import { describe, expect, it } from "vitest"
import { program, statement } from "../../test-utils/ast.js"
import { transformPresentationCode } from "./transform.js"

describe("transformPresentationCode", () => {
  it("should transform MDX code by removing default export and adding Presentation wrapper", () => {
    const input = dedent`
      import { jsx as _jsx } from "react/jsx-runtime"

      export const MERCURY_SLIDES_LENGTH = 2

      function MDXContent(props = {}) {
        const { wrapper: MDXLayout } = props.components || {}
        return MDXLayout ? _jsx(MDXLayout, {
          ...props,
          children: _jsx(_createMdxContent, { ...props })
        }) : _createMdxContent(props)
      }

      export default MDXContent
    `

    const result = program(transformPresentationCode(input).code)

    // Should contain Presentation import
    expect(result).toContain(
      statement('import {Presentation} from "@mercurymd/react"'),
    )

    // Should not contain the original default export
    expect(result).not.toContain("export default MDXContent")

    // Should contain new default export with Presentation wrapper
    expect(result).toContain(
      statement(
        "export default ({ components }) => <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />",
      ),
    )

    // Should preserve other exports
    expect(result).toContain(
      statement("export const MERCURY_SLIDES_LENGTH = 2"),
    )
  })

  it("should handle code with existing imports", () => {
    const input = dedent`
      import { jsx as _jsx } from "react/jsx-runtime"
      import { useState } from "react"
      import { Callout } from "@mercurymd/react"

      export const MERCURY_SLIDES_LENGTH = 3

      export default function MDXContent() {
        return _jsx("div", { children: "Content" })
      }
    `

    const result = program(transformPresentationCode(input).code)

    // Should preserve existing imports
    expect(result).toContain(
      statement('import { jsx as _jsx } from "react/jsx-runtime"'),
    )
    expect(result).toContain(statement('import { useState } from "react"'))

    // Should merge with existing imports from @mercurymd/react
    expect(result).toContain(
      statement('import { Callout, Presentation } from "@mercurymd/react"'),
    )

    // Should replace default export
    expect(result).not.toContain("export default function MDXContent()")
    expect(result).toContain(
      statement(
        "export default ({ components }) => <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />",
      ),
    )
  })
})
