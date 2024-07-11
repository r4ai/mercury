import { defu } from "defu";
import type { Plugin } from "vite";
import rollupMdx, { type Options as RollupMdxOptions } from "@mdx-js/rollup";
import remarkMercury, { type RemarkMercuryOptions } from "@r4ai/remark-mercury";
import remarkGfm, { type Options as RemarkGfmOptions } from "remark-gfm";

export type MercuryMdxOptions = {
	remarkMercury?: RemarkMercuryOptions | false;
	remarkGfm?: RemarkGfmOptions | false;
};

export const mercuryMdxDefaultOptions = {
	remarkMercury: {
		slide: (index) => ({
			tagName: "Slide",
			properties: {
				index,
			},
		}),
		presentation: () => ({
			tagName: "Presentation",
			properties: {},
		}),
	},
	remarkGfm: {},
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

	return {
		enforce: "pre",
		...rollupMdx({
			...options,
			remarkPlugins: [...remarkPlugins, ...(options.remarkPlugins ?? [])],
		}),
	};
};
