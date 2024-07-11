import { defu } from "defu";
import { mdx, type MercuryMdxOptions } from "./plugins/index.js";
import type { Plugin } from "vite";

export type MercuryOptions = {
	mdx?: MercuryMdxOptions;
};

export const mercuryDefaultOptions = {} as const satisfies MercuryOptions;

export const mercury = (_options?: MercuryOptions): Plugin[] => {
	const options = defu(_options, mercuryDefaultOptions);

	return [mdx(options.mdx)];
};
