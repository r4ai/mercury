import React from "react";
import ReactDOM from "react-dom/client";
import Presentation from "./Presentation.mdx";

// biome-ignore lint/style/noNonNullAssertion: #root is always present in the DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Presentation />
  </React.StrictMode>,
);
