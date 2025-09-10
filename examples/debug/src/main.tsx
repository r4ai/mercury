import { PresentationsProvider } from "@mercurymd/react";
import React from "react";
import ReactDOM from "react-dom/client";
import Presentation from "./presentation.mdx";
import "./main.css";

// biome-ignore lint/style/noNonNullAssertion: #root is always present in the DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PresentationsProvider>
      <Presentation />
    </PresentationsProvider>
  </React.StrictMode>,
);
