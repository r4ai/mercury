/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
  export const MERCURY_SLIDES_LENGTH: number;
}
