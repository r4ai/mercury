import { Presentation } from "@mercurymd/react";
import {jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
export const MERCURY_SLIDES_LENGTH = 2;
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    ...props.components
  }, {Presentation, Slide} = _components;
  if (!Presentation) _missingMdxReference("Presentation", true);
  if (!Slide) _missingMdxReference("Slide", true);
  return _jsxs(Presentation, {
    slidesLength: "2",
    children: ["\n", _jsxs(Slide, {
      index: "0",
      children: ["\n", _jsx(_components.h1, {
        children: "Slide 1"
      }), "\n"]
    }), "\n", _jsxs(Slide, {
      index: "1",
      children: ["\n", _jsx(_components.h1, {
        children: "Slide 2"
      }), "\n"]
    }), "\n"]
  });
}

function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

function _missingMdxReference(id, component) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

export default (
  {
    components
  }
) => <Presentation
  Content={MDXContent}
  slidesLength={MERCURY_SLIDES_LENGTH}
  components={components} />;