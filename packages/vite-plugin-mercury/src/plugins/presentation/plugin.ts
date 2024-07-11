import { createFilter, type Plugin } from "vite";

export type MercuryPresentationOptions = {
	include?: string[];
	exclude?: string[];
};

export const mercuryPresentationDefaultOptions = {
	include: ["**/*.mdx"],
	exclude: [],
} as const satisfies Required<MercuryPresentationOptions>;

export const presentation = (_options: MercuryPresentationOptions): Plugin => {
	const options = { ...mercuryPresentationDefaultOptions, ..._options };
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "mercury-presentation",
		transform(code, id) {
			if (!filter(id)) return;


		},
	};
};
