import { defu } from "defu";
import type { Plugin } from "vite";
import { type MercuryMdxOptions, mdx, presentation } from "./plugins/index.js";

export type MercuryOptions = {
  mdx?: MercuryMdxOptions;
};

export const mercuryDefaultOptions = {} as const satisfies MercuryOptions;

export const mercury = (_options?: MercuryOptions): Plugin[] => {
  const options = defu(_options, mercuryDefaultOptions);

  return [mdx(options.mdx), presentation()];
};
