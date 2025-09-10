import { Button, type ButtonProps } from "@mercurymd/react";
import confetti from "canvas-confetti";
import type { FC } from "react";

export type FireworkButtonProps = ButtonProps;

export const FireworkButton: FC<FireworkButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      onClick={() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
