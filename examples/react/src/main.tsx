import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "katex/dist/katex.min.css";
import "@r4ai/mercury-ui/style.css";
import "./main.css";

// biome-ignore lint/style/noNonNullAssertion: #root is always present in the DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
