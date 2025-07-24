type TitleProps = {
  title: string;
  author: string;
};

export const Title = ({ title, author }: TitleProps) => (
  <div className="flex flex-col h-full justify-center max-w-3xl mx-auto">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p className="mt-4">{author}</p>
  </div>
);
