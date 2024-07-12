import rollupMdx, { type Options as RollupMdxOptions } from "@mdx-js/rollup";
import remarkMercury, { type RemarkMercuryOptions } from "@r4ai/remark-mercury";
import { defu } from "defu";
import rehypeKatex, { type Options as rehypeKatexOptions } from "rehype-katex";
import remarkGfm, { type Options as RemarkGfmOptions } from "remark-gfm";
import remarkMath, { type Options as RemarkMathOptions } from "remark-math";
import type { Plugin } from "vite";

export type MercuryMdxOptions = {
  remarkMercury?: RemarkMercuryOptions | false;
  remarkGfm?: RemarkGfmOptions | false;
  remarkMath?: RemarkMathOptions | false;
  rehypeKatex?: rehypeKatexOptions | false;
};

export const mercuryMdxDefaultOptions = {
  remarkMercury: {
    slide: (index) => ({
      tagName: "Slide",
      properties: {
        index,
      },
    }),
    presentation: (slidesLength) => ({
      tagName: "Presentation",
      properties: {
        slidesLength,
      },
    }),
  },
  remarkGfm: {},
  remarkMath: {},
  rehypeKatex: {},
} as const satisfies MercuryMdxOptions;

export const mdx = (
  _options?: RollupMdxOptions & MercuryMdxOptions,
): Plugin => {
  const options = defu(_options, mercuryMdxDefaultOptions);

  const remarkPlugins: RollupMdxOptions["remarkPlugins"] = [];
  if (options.remarkMercury) {
    remarkPlugins.push([remarkMercury, options.remarkMercury]);
  }
  if (options.remarkGfm) {
    remarkPlugins.push([remarkGfm, options.remarkGfm]);
  }
  if (options.remarkMath) {
    remarkPlugins.push([remarkMath, options.remarkMath]);
  }

  const rehypePluins: RollupMdxOptions["rehypePlugins"] = [];
  if (options.rehypeKatex) {
    rehypePluins.push([rehypeKatex, options.rehypeKatex]);
  }

  return {
    enforce: "pre",
    ...rollupMdx({
      ...options,
      remarkPlugins: [...remarkPlugins, ...(options.remarkPlugins ?? [])],
      rehypePlugins: [...rehypePluins, ...(options.rehypePlugins ?? [])],
    }),
  };
};
