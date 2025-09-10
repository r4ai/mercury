import { describe, expect, test } from "vitest"
import { helloWorld } from "./index.js"

describe("bun-npm-package", () => {
  test("Hello, world!", () => {
    expect(helloWorld()).toBe("Hello, world!")
  })
})
