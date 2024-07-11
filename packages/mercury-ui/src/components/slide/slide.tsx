import { type FC, type ReactNode, useEffect, useId } from "react";
import { Route, useLocation } from "wouter";

export type SlideProps = {
  index: number;
  children?: ReactNode;
};

export const Slide: FC<SlideProps> = ({ index, children }) => {
  const id = useId();
  const [location] = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: when scale changes, we need to update the transform
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    resize(el);

    window.addEventListener("resize", () => {
      resize(el);
    });
  }, [id, location]);

  return (
    <Route path={`/${index}`}>
      <div
        id={id}
        data-slide
        className="aspect-[16/9] my-auto absolute w-[960px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-8 space-y-4 border"
      >
        {children}
      </div>
    </Route>
  );
};

const resize = (el: HTMLElement) => {
  const elWidth = el?.offsetWidth;
  const elHeight = el?.offsetHeight;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const widthScale = viewportWidth / elWidth;
  const heightScale = viewportHeight / elHeight;
  const scale = Math.min(widthScale, heightScale);

  el?.style.setProperty("transform", `scale(${scale})`);
};
