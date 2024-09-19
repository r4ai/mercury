import { ThemeProvider } from "next-themes"
import React from "react"
import ReactDOM from "react-dom/client"
import { Router } from "wouter"
import Presentation from "./Presentation.mdx"
import "katex/dist/katex.min.css"
import "./main.css"
import "@r4ai/mercury-ui/style.css"

// biome-ignore lint/style/noNonNullAssertion: #root is always present in the DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider attribute="data-color-scheme">
        <Presentation />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)
