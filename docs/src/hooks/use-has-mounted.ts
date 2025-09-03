import { useEffect, useState } from "react"

/**
 * A custom hook that returns whether the component has mounted.
 *
 * @see https://github.com/wakujs/waku/issues/1499
 * @see https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
 *
 * @returns `true` if the component has mounted, `false` otherwise.
 */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}
