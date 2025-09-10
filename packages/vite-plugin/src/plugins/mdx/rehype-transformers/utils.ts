import rangeParser from "parse-numeric-range"

type Range = number[]

type RequiredMeta = {
  range?: Range
}

type OptionalMeta = Record<string, string | boolean | Range | undefined>

export type Meta = Omit<OptionalMeta, keyof RequiredMeta> & RequiredMeta

export const defaultMeta: Required<Meta> = {
  range: [],
}

type Group = {
  range?: string
  kv?: string
  kvKey?: string
  kvValue?: string
  kvDoubleQuote?: string
  kvDoubleQuoteKey?: string
  kvDoubleQuoteValue?: string
  kvSingleQuote?: string
  kvSingleQuoteKey?: string
  kvSingleQuoteValue?: string
  boolValue?: string
}

// meta = "{" range ("," range)* "}"             // -> range
//      | string "=" string                      // -> kv
//      | "\"" string "\"" "=" "\"" string "\""  // -> kv
//      | "'" string "'" "=" "'" string "'       // -> kv
//      | string                                 // -> bool
//
// range = number "-" number
//       | number
const PARSE_REGEX = new RegExp(
  [
    /\{(?<range>.*?)\}/.source,
    /|(?<kv>(?<kvKey>[^\s]+?)\s*=\s*(?<kvValue>[^\s"']+?))(?=\s|$)/.source,
    /|(?<kvDoubleQuote>(?<kvDoubleQuoteKey>[^\s]+?)\s*=\s*"(?<kvDoubleQuoteValue>.*?)(?<!\\)")/
      .source,
    /|(?<kvSingleQuote>(?<kvSingleQuoteKey>[^\s]+?)\s*=\s*'(?<kvSingleQuoteValue>.*?)(?<!\\)')/
      .source,
    /|(?<=\s|^)(?<boolValue>[^\s=]+?)(?=\s|$)/.source,
  ].join(""),
  "g",
)

/**
 * Parse meta string to object.
 * @param meta meta string
 * @returns meta object
 */
export const parseMeta = <M extends Meta = Meta>(
  meta: string | undefined,
): M => {
  const metaObj = { ...defaultMeta }
  if (!meta) return metaObj as M

  const matches = meta.matchAll(PARSE_REGEX)
  for (const match of matches) {
    const groups = match.groups as Group
    if (groups.range && Array.isArray(metaObj.range)) {
      const range = rangeParser(groups.range)
      metaObj.range = [...metaObj.range, ...range]
    }
    if (groups.kvKey && groups.kvValue) {
      metaObj[groups.kvKey] = retrieveEscapedString(groups.kvValue)
    }
    if (groups.kvDoubleQuoteKey && groups.kvDoubleQuoteValue) {
      metaObj[groups.kvDoubleQuoteKey] = retrieveEscapedString(
        groups.kvDoubleQuoteValue,
      )
    }
    if (groups.kvSingleQuoteKey && groups.kvSingleQuoteValue) {
      metaObj[groups.kvSingleQuoteKey] = retrieveEscapedString(
        groups.kvSingleQuoteValue,
      )
    }
    if (groups.boolValue) {
      metaObj[groups.boolValue] = true
    }
  }
  metaObj.range = removeDuplicateAndSort(metaObj.range)

  return metaObj as M
}

export const retrieveEscapedString = (str: string) =>
  str.replace(/\\(.)/g, "$1")

export const removeDuplicateAndSort = (arr: number[]) => {
  return Array.from(new Set(arr)).sort((a, b) => a - b)
}
