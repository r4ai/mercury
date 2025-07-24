# Debug

This example is run in debug mode, which outputs intermediate representations (mdast, hast, jsx, etc.) to the following files:

- `mdast_start.json`: mdast generated from the markdown input.
- `mdast_end.json`: mdast after all processing with remark plugins.
- `mdast_before_remark_mercury.json`: mdast before processing with a remark-mercury plugin.
- `mdast_after_remark_mercury.json`: mdast after processing with a remark-mercury plugin.
- `hast_start.json`: hast generated from the mdast.
- `hast_end.json`: hast after all processing with rehype plugins.
- `jsx_start.js`: JSX generated from the hast.
- `jsx_end.js`: JSX after all internal processing.
