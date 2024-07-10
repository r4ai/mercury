import type { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "../../libs/utils";

export type VerticalDividerProps = ComponentPropsWithoutRef<"div">;

export const VerticalDivider: FC<VerticalDividerProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("h-8 my-auto w-0.5 rounded-full bg-border", className)}
      {...props}
    />
  );
};
