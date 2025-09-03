import icon from "@/assets/icon.png"
import { Editor, PlaygroundProvider, Preview } from "@/components/playground"

const HeroSection = () => (
  <section className="flex flex-row items-center justify-between">
    <div className="flex flex-col items-center mx-auto gap-8">
      <img src={icon} alt="Mercury Icon" className="size-52" />
      <h1 className="text-6xl font-bold text-balance font-geist">Mercury</h1>
      <p className="text-xl text-balance max-w-2xl mx-auto text-center font-geist">
        Write MDX, render it as a presentation.
        <br />
        If you can write MDX and JSX, you can use Mercury.
      </p>
    </div>
  </section>
)

const PlaygroundSection = () => (
  <section className="container flex flex-col gap-8">
    <h2 className="text-4xl text-balance text-center font-geist font-bold">
      Playground
    </h2>
    <p className="text-center font-geist text-lg text-muted-foreground">
      Try writing some MDX code in the editor and see the preview update in
      real-time.
    </p>
    <PlaygroundProvider>
      <div className="grid grid-cols-2 gap-8">
        <Editor height="500px" className="flex-1" />
        <Preview className="flex-1" />
      </div>
    </PlaygroundProvider>
  </section>
)

const LandingPage = () => (
  <div className="flex flex-col flex-1 items-center gap-12 my-12">
    <HeroSection />
    <div className="h-[1px] bg-border w-full" />
    <PlaygroundSection />
  </div>
)

export default LandingPage

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
