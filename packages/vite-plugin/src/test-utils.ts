import rehypeStringify from "rehype-stringify"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { type PluggableList, unified } from "unified"

/**
 * Renders markdown/MDX input to HTML string using unified processor chain
 * @param input - The markdown/MDX input string
 * @param remarkPlugins - Array of remark plugins to apply
 * @param rehypePlugins - Array of rehype plugins to apply
 * @returns Promise that resolves to HTML string
 */
export const renderHtml = async (
  input: string,
  remarkPlugins: PluggableList,
  rehypePlugins: PluggableList,
): Promise<string> => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkPlugins)
    .use(remarkRehype)
    .use(rehypePlugins)
    .use(rehypeStringify)
  const file = await processor.process(input)
  return String(file)
}

/**
 * Creates a DOM container element from HTML string for testing
 * This creates an isolated container that doesn't affect the global document
 * @param html - HTML string to convert to DOM
 * @returns DOM container element
 */
export const createDOMFromHTML = (html: string): HTMLElement => {
  const container = document.createElement("div")
  container.innerHTML = html
  return container
}
