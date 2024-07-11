import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "../../libs/utils";

export type KeyboardProps = ComponentPropsWithoutRef<"kbd">;

export const Keyboard = forwardRef<HTMLElement, KeyboardProps>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        className={cn(
          "rounded-md border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Keyboard.displayName = "Keyboard";
