import {
	type Plugin,
	type ResolvedConfig,
	createFilter,
	transformWithEsbuild,
} from "vite";
import type { TransformOptions } from "esbuild";
import dedent from "dedent";

export type MercuryPresentationOptions = {
	include?: string[];
	exclude?: string[];
	esbuildTransformOptions?: TransformOptions;
};

export const mercuryPresentationDefaultOptions = {
	include: ["**/*.mdx"],
	exclude: [],
	esbuildTransformOptions: {
		loader: "tsx",
		target: "esnext",
		jsx: "automatic",
	},
} as const satisfies Required<MercuryPresentationOptions>;

export const presentation = (_options?: MercuryPresentationOptions): Plugin => {
	const options = { ...mercuryPresentationDefaultOptions, ..._options };
	const filter = createFilter(options.include, options.exclude);

	// @ts-ignore
	let config: ResolvedConfig;
	// @ts-ignore
	let isDev: boolean;

	return {
		name: "mercury-presentation",
		config(_, { command }) {
			isDev = command === "serve";
		},
		configResolved(resolvedConfig) {
			config = resolvedConfig;
		},
		async transform(code, id) {
			if (!filter(id)) return;

			let source = code;

			// don't default export
			source = source.replace(/^export default /m, "");

			// export default Presentation
			source += "\n";
			source += dedent`
        import { Presentation } from "@r4ai/mercury-ui";

        export default () => {
          return <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} />;
        }
      `;

			const js = await transformWithEsbuild(source, id, {
				sourcefile: id,
				...options.esbuildTransformOptions,
			});

			return {
				code: js.code,
				map: js.map,
			};
		},
	};
};
