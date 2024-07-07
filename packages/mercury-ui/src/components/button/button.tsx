import type { ComponentPropsWithoutRef, FC } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className="bg-blue-600 text-white" {...props}>
      {children}
    </button>
  );
};
