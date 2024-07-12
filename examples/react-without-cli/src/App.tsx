import { ThemeProvider } from "next-themes";
import { Router } from "wouter";
import Presentation from "./Presentation.mdx";

export default () => {
  return (
    <Router>
      <ThemeProvider attribute="data-color-scheme">
        <Presentation />
      </ThemeProvider>
    </Router>
  );
};
