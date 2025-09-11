import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

let prevRefreshReg;
let prevRefreshSig;

if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const MERCURY_SLIDES_LENGTH = 2;
function _createMdxContent(props) {
  const _components = {
      h1: "h1",
      ...props.components
    },{ Presentation, Slide } = _components;
  if (!Presentation) _missingMdxReference("Presentation", true);
  if (!Slide) _missingMdxReference("Slide", true);
  return _jsxDEV(Presentation, {
    slidesLength: "2",
    children: ["\n", _jsxDEV(Slide, {
      index: "0",
      children: ["\n", _jsxDEV(_components.h1, {
        children: "Slide 1"
      }, undefined, false, {
        fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx",
        lineNumber: 1,
        columnNumber: 1
      }, this), "\n"]
    }, undefined, true, {
      fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx"
    }, this), "\n", _jsxDEV(Slide, {
      index: "1",
      children: ["\n", _jsxDEV(_components.h1, {
        children: "Slide 2"
      }, undefined, false, {
        fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx",
        lineNumber: 5,
        columnNumber: 1
      }, this), "\n"]
    }, undefined, true, {
      fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx"
    }, this), "\n"]
  }, undefined, true, {
    fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx"
  }, this);
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? _jsxDEV(MDXLayout, {
    ...props,
    children: _jsxDEV(_createMdxContent, {
      ...props
    }, undefined, false, {
      fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx"
    }, this)
  }, undefined, false, {
    fileName: "/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx"
  }, this) : _createMdxContent(props);
}_c = MDXContent;
function _missingMdxReference(id, component, place) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\nIt’s referenced in your code at `" + place + "` in `/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx`" : ""));
}var _c;$RefreshReg$(_c, "MDXContent");

if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/r4ai/src/repos/github.com/r4ai/mercury-bob/examples/debug/src/presentation.mdx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

import { Presentation } from "@mercurymd/react";

export default ({ components }) => {
  return <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />;
}