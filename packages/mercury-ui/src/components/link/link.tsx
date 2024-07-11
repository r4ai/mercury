import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Link as WouterLink, type LinkProps as WouterLinkProps } from "wouter";
import { cn } from "../../libs/utils";

export type LinkProps = WouterLinkProps & ComponentPropsWithoutRef<"a">;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <WouterLink
        // @ts-expect-error className exists. see: https://github.com/molefrog/wouter?tab=readme-ov-file#link-hrefpath-
        className={cn("underline transition hover:opacity-75", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Link.displayName = "Link";
