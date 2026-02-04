import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, test, vi } from "vitest"
import { useIsMobile } from "./use-is-mobile"

type MatchMediaMock = {
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  setMatches: (nextMatches: boolean) => void
}

const setupMatchMedia = (initialMatches: boolean): MatchMediaMock => {
  let matches = initialMatches
  const listeners = new Set<(event: MediaQueryListEvent) => void>()

  const addEventListener = vi.fn(
    (event: string, listener: (event: MediaQueryListEvent) => void) => {
      if (event !== "change") return
      listeners.add(listener)
    },
  )

  const removeEventListener = vi.fn(
    (event: string, listener: (event: MediaQueryListEvent) => void) => {
      if (event !== "change") return
      listeners.delete(listener)
    },
  )

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      get matches() {
        return matches
      },
      media: "(hover: none), (pointer: coarse)",
      onchange: null,
      addEventListener,
      removeEventListener,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  const setMatches = (nextMatches: boolean) => {
    matches = nextMatches
    for (const listener of listeners) {
      listener(new Event("change") as MediaQueryListEvent)
    }
  }

  return { addEventListener, removeEventListener, setMatches }
}

describe("useIsMobile", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test("returns the initial matchMedia value", () => {
    setupMatchMedia(true)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  test("updates on media query changes and removes listeners on unmount", () => {
    const mediaQuery = setupMatchMedia(false)

    const { result, unmount } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    act(() => {
      mediaQuery.setMatches(true)
    })
    expect(result.current).toBe(true)

    const listener = mediaQuery.addEventListener.mock.calls[0]?.[1]
    unmount()

    expect(mediaQuery.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    )
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith(
      "change",
      listener,
    )
  })
})
