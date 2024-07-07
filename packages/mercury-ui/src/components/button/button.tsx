import type { ComponentPropsWithoutRef, FC } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
