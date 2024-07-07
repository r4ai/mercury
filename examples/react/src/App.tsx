import { Button } from "@r4ai/mercury-ui";
import { Redirect, Route, Switch } from "wouter";
import Content from "./Presentation.mdx";
import { Slide } from "./components/Slide";

export default () => {
  return (
    <>
      <div className="bg-demo">
        <Button>Hello, world!</Button>
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
      </div>
    </>
  );
};
