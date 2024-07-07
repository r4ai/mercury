import type { FC, ReactNode } from "react";
import { Route } from "wouter";

export type SlideProps = {
  index: number;
  children?: ReactNode;
};

export const Slide: FC<SlideProps> = (props) => {
  return (
    <Route path={`/${props.index}`}>
      <div className="border aspect-[16/9] my-auto absolute w-full top-1/2 translate-y-[-50%]">
        {props.children}
      </div>
    </Route>
  );
};
