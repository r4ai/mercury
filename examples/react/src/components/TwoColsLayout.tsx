import type { ReactNode } from "react";

export const TwoColsLayout = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 gap-6">{children}</div>
);

export const Left = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6">{children}</div>
);

export const Right = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6">{children}</div>
);
