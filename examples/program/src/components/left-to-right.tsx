import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
} from "react";
import { twMerge } from "tailwind-merge";

const LeftToRightContext = createContext<{
  left?: ReactNode;
  leftProps?: ComponentPropsWithoutRef<"div">;
  right?: ReactNode;
  rightProps?: ComponentPropsWithoutRef<"div">;
  center?: ReactNode;
  centerProps?: ComponentPropsWithoutRef<"div">;
}>({});

const LeftToRightProvider = LeftToRightContext.Provider;

const useLeftToRight = () => {
  const context = useContext(LeftToRightContext);
  if (!context) {
    throw new Error("useLeftToRight must be used within a LeftToRightProvider");
  }
  return context;
};

type LeftToRightProps = {
  className?: string;
  children?: ReactNode;
};

export const LeftToRight = ({ className, children }: LeftToRightProps) => {
  return (
    <LeftToRightProvider value={{ center: <div>⇒</div> }}>
      {children}
      <div
        className={twMerge(
          "grid place-content-center place-items-center gap-6 grid-cols-[repeat(3,max-content)]",
          className,
        )}
      >
        <LeftContainer />
        <CenterContainer />
        <RightContainer />
      </div>
    </LeftToRightProvider>
  );
};

const LeftContainer = () => {
  const { left, leftProps } = useLeftToRight();
  return <div {...leftProps}>{left}</div>;
};

const RightContainer = () => {
  const { right, rightProps } = useLeftToRight();
  return <div {...rightProps}>{right}</div>;
};

const CenterContainer = () => {
  const { center, centerProps } = useLeftToRight();
  return <div {...centerProps}>{center}</div>;
};

export const Left = ({ children, ...props }: { children: ReactNode }) => {
  const context = useContext(LeftToRightContext);
  context.left = children;
  context.leftProps = props;
  return null;
};

export const Right = ({ children, ...props }: { children: ReactNode }) => {
  const context = useContext(LeftToRightContext);
  context.right = children;
  context.rightProps = props;
  return null;
};

export const Center = ({ children, ...props }: { children: ReactNode }) => {
  const context = useContext(LeftToRightContext);
  context.center = children;
  context.centerProps = props;
  return null;
};
