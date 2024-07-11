import { defu } from "defu";
import { mdx, type MercuryMdxOptions } from "./plugins/index.js";

export type MercuryOptions = {
	mdx?: MercuryMdxOptions;
};

export const mercuryDefaultOptions = {} as const satisfies MercuryOptions;

export function mercury(_options?: MercuryOptions) {
	const options = defu(
		_options,
		mercuryDefaultOptions,
	);

	return [
    mdx(options.mdx),
  ];
}
