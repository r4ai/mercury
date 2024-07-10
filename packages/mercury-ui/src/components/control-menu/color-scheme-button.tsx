import { useTheme } from "next-themes";
import type { FC } from "react";
import MoonStarIcon from "~icons/lucide/moon-star";
import SunIcon from "~icons/lucide/sun";
import { Button, type ButtonProps } from "../button";

export type ColorSchemeButtonProps = ButtonProps;

export const ColorSchemeButton: FC<ColorSchemeButtonProps> = ({ ...props }) => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
      }}
      {...props}
    >
      <SunIcon className="size-6 dark:hidden" />
      <MoonStarIcon className="size-6 hidden dark:block" />
    </Button>
  );
};
