/// <reference types="remark-mdx" />

import { defu } from "defu";
import type * as hast from "hast";
import type * as mdast from "mdast";
import type { Plugin } from "unified";

export type Options = {
  slideSplitter?: "thematicBreak" | "heading";
  slide?: (index: number) => {
    tagName: string;
    properties: hast.Properties;
  };
  presentation?: () => {
    tagName: string;
    properties: hast.Properties;
  };
};

export const defaultOptions = {
  slideSplitter: "thematicBreak",
  slide: (index) => ({
    tagName: "section",
    properties: {
      className: "slide",
      dataSlideIndex: index,
    },
  }),
  presentation: () => ({
    tagName: "section",
    properties: {
      className: "presentation",
    },
  }),
} as const satisfies Required<Options>;

export const remarkMercury: Plugin<[Options?], mdast.Root, mdast.Root> = (
  _options,
) => {
  const options: Required<Options> = defu(_options, defaultOptions);

  return (tree: mdast.Root) => splitToSlides(tree, options);
};

const isSlideSplitter = (
  node: mdast.RootContent,
  slideSplitter: Options["slideSplitter"],
) => {
  switch (slideSplitter) {
    case "thematicBreak":
      return node.type === "thematicBreak";
    case "heading":
      return node.type === "heading" && node.depth === 1;
    default:
      return false;
  }
};

type Slide = {
  /** the node's position in its parent */
  start: number;

  /** the node's position in its parent */
  end: number;

  /** the node's children */
  children: (mdast.BlockContent | mdast.DefinitionContent)[];
};

const splitToSlides = (
  tree: mdast.Root,
  options: Required<Options>,
): mdast.Root => {
  const slides: Slide[] = [];

  // Split the tree into slides
  let lastSlideIndex = 0;
  for (const [index, node] of tree.children.entries()) {
    if (isSlideSplitter(node, options.slideSplitter)) {
      if (options.slideSplitter === "heading" && index === 0) continue;
      slides.push({
        start: lastSlideIndex,
        end: index,
        children: tree.children.slice(
          lastSlideIndex,
          index,
        ) as Slide["children"],
      });
      lastSlideIndex =
        index + (options.slideSplitter === "thematicBreak" ? 1 : 0); // +1 to skip the splitter
    }
  }
  slides.push({
    start: lastSlideIndex,
    end: tree.children.length,
    children: tree.children.slice(
      lastSlideIndex,
      tree.children.length,
    ) as Slide["children"],
  });

  // Create a new tree with the slides
  const treeChildren = [];
  for (const [index, slide] of slides.entries()) {
    const slideNode: mdast.Blockquote = {
      type: "blockquote",
      data: {
        hName: options.slide(index).tagName,
        hProperties: options.slide(index).properties,
      },
      children: slide.children,
    };
    treeChildren.push(slideNode);
  }

  return {
    ...tree,
    children: [
      {
        type: "blockquote",
        data: {
          hName: options.presentation().tagName,
          hProperties: options.presentation().properties,
        },
        children: treeChildren,
      },
      exportSlidesLength(slides.length),
    ],
  };
};

/**
 * Export the number of slides as a constant.
 *
 * @example
 * Generates the following code:
 * ```ts
 * export const MERCURY_SLIDES_LENGTH = 3;
 * ```
 */
const exportSlidesLength = (slidesLength: number): mdast.RootContent => {
  const code = `export const MERCURY_SLIDES_LENGTH = ${slidesLength};`;
  return {
    type: "mdxjsEsm",
    value: code,
    data: {
      estree: {
        type: "Program",
        body: [
          {
            type: "ExportNamedDeclaration",
            declaration: {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "MERCURY_SLIDES_LENGTH",
                  },
                  init: {
                    type: "Literal",
                    value: slidesLength,
                    raw: `${slidesLength}`,
                  },
                },
              ],
              kind: "const",
            },
            specifiers: [],
            source: null,
          },
        ],
        sourceType: "module",
        comments: [],
      },
    },
  };
};
