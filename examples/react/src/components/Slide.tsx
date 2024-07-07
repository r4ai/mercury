import type { FC, ReactNode } from "react";
import { Route } from "wouter";

export type SlideProps = {
  index: number;
  children?: ReactNode;
};

export const Slide: FC<SlideProps> = (props) => {
  return <Route path={`/${props.index}`}>{props.children}</Route>;
};
