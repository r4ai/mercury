import type { ReactNode } from "react";

export const Callout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="p-3 border rounded-lg">
    <div className="font-bold">{title}</div>
    <div className="text-sm *:leading-relaxed mt-2">{children}</div>
  </div>
);
