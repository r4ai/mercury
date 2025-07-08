import type { FC } from "react";

export type TitleProps = {
  title: string;
  affiliation: string;
  author: string;
};

export const Title: FC<TitleProps> = ({ title, affiliation, author }) => {
  return (
    <div className="flex flex-col justify-center h-full gap-12 m-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground">RICORA Programming Team</p>
      </div>
      <div className="grid grid-cols-[auto_auto] w-fit gap-x-4 text-lg">
        <span className="text-muted-foreground">所属</span>
        <span>{affiliation}</span>
        <span className="text-muted-foreground">ハンドルネーム</span>
        <span>{author}</span>
      </div>
    </div>
  );
};
