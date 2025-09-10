import { useMemo } from "react"
import { useSearch } from "wouter"

export const useSearchParams = () => {
  const searchString = useSearch()
  const searchParams = useMemo(
    () => new URLSearchParams(searchString),
    [searchString],
  )
  return searchParams
}
