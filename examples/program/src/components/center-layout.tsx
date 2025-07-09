import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CenterLayoutProps = {
  children?: ReactNode;
  className?: string;
};

export const CenterLayout = ({ className, children }: CenterLayoutProps) => (
  <div
    className={twMerge(
      "flex flex-col items-center justify-center h-full",
      className,
    )}
  >
    {children}
  </div>
);
