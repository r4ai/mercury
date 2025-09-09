import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * Converts a heading string into a URL-friendly slug.
 * @param value The heading string to convert.
 * @returns The URL-friendly slug.
 */
export const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "") // remove non-word
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/-+/g, "-") // collapse dashes

/**
 * Converts a kebab-case string to Title Case.
 * @param kebabCaseStr The kebab-case string to convert.
 * @returns The Title Case string.
 *
 * @example
 * toTitleCase("this-is-a-sample-string") // "This Is A Sample String"
 */
export const toTitleCase = (kebabCaseStr: string) =>
  kebabCaseStr
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
