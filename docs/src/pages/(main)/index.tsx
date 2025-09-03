import icon from "@/assets/icon.png"
import { PlaygroundProvider } from "@/components/playground"

const HeroSection = () => (
  <section className="flex flex-row items-center justify-between px-4">
    <div className="flex flex-col items-center mx-auto gap-6 sm:gap-8">
      <img
        src={icon}
        alt="Mercury Icon"
        className="size-32 sm:size-44 md:size-52"
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance font-geist text-center">
        Mercury
      </h1>
      <p className="text-lg sm:text-xl text-balance max-w-2xl mx-auto text-center font-geist px-2">
        Write MDX, render it as a presentation.
        <br />
        If you can write MDX and JSX, you can use Mercury.
      </p>
    </div>
  </section>
)

const PlaygroundSection = () => (
  <section className="container flex flex-col gap-6 sm:gap-8 px-4">
    <h2 className="text-3xl sm:text-4xl text-balance text-center font-geist font-bold">
      Playground
    </h2>
    <p className="text-center font-geist text-base sm:text-lg text-muted-foreground px-2">
      Try writing some MDX code in the editor and see the preview update in
      real-time.
    </p>
    <PlaygroundProvider>
      <iframe
        className="w-full h-[400px] sm:h-[500px]"
        title="playground section"
        src="/internal/playground-section"
      />
    </PlaygroundProvider>
  </section>
)

const LandingPage = () => (
  <div className="flex flex-col flex-1 items-center gap-8 sm:gap-12 my-8 sm:my-12">
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
