import { Button, ControlMenu, components } from "@r4ai/mercury-ui";
import { ThemeProvider } from "next-themes";
import { Redirect, Route, Router, Switch } from "wouter";
import Content, { MERCURY_SLIDES_LENGTH } from "./Presentation.mdx";
import { Slide } from "./components/Slide";

export default () => {
  return (
    <Router>
      <ThemeProvider attribute="data-color-scheme">
        <div className="h-full">
          <Switch>
            <Route path="/">
              <Redirect to="/0" />
            </Route>
            <Content
              components={{
                ...components,
                Slide,
                Presentation: ({ children }) => children,
              }}
            />
          </Switch>
          <ControlMenu
            className="absolute bottom-2 left-4"
            slidesLength={MERCURY_SLIDES_LENGTH}
          />
        </div>
      </ThemeProvider>
    </Router>
  );
};
