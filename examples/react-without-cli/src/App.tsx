import { Presentation } from "@r4ai/mercury-ui";
import { ThemeProvider } from "next-themes";
import { Router } from "wouter";
import Content, { MERCURY_SLIDES_LENGTH } from "./Presentation.mdx";

export default () => {
  return (
    <Router>
      <ThemeProvider attribute="data-color-scheme">
        <Presentation Content={Content} slidesLength={MERCURY_SLIDES_LENGTH} />
      </ThemeProvider>
    </Router>
  );
};
