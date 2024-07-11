import type { FC } from "react";
import { cn } from "../../libs/utils";
import { useSlides } from "./hooks/use-slides";

export type CounterProps = {
  className?: string;
  slidesLength: number;
};

export const Counter: FC<CounterProps> = ({ className, slidesLength }) => {
  const { index } = useSlides({ length: slidesLength });

  return (
    <div className={cn("flex flex-row items-center gap-1", className)}>
      <span>{index() + 1}</span>
      <span className="text-muted-foreground text-sm">/</span>
      <span className="text-muted-foreground text-sm">{slidesLength}</span>
    </div>
  );
};
