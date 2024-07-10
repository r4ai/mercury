import { Button, ControlMenu } from "@r4ai/mercury-ui";
import { ThemeProvider } from "next-themes";
import { Redirect, Route, Switch } from "wouter";
import Content, { MERCURY_SLIDES_LENGTH } from "./Presentation.mdx";
import { Slide } from "./components/Slide";

export default () => {
  return (
    <ThemeProvider attribute="data-color-scheme">
      <div className="h-full">
        <Switch>
          <Route path="/">
            <Redirect to="/0" />
          </Route>
          <Content
            components={{
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
  );
};
