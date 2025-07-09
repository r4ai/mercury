type MDXContentProps = {
  components: {
    Presentation: React.FC<{
      slidesLength: number;
      children?: React.ReactNode;
    }>;
    Slide: React.FC<{ index: number; children?: React.ReactNode }>;
    h1: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  };
};

const MDXContent = ({ components }: MDXContentProps) => {
  return (
    <components.Presentation slidesLength={2}>
      <components.Slide index={0}>
        <components.h1>Slide 1</components.h1>
      </components.Slide>
      <components.Slide index={1}>
        <components.h1>Slide 2</components.h1>
      </components.Slide>
    </components.Presentation>
  );
};

export default MDXContent
