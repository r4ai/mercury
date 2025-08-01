import { PresentationsProvider } from "@r4ai/mercury-ui";
import React from "react";
import ReactDOM from "react-dom/client";
import Presentation from "./presentation.mdx";
import "katex/dist/katex.min.css";
import "./main.css";

// biome-ignore lint/style/noNonNullAssertion: #root is always present in the DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PresentationsProvider>
      <Presentation />
    </PresentationsProvider>
  </React.StrictMode>,
);
