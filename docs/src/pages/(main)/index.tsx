import icon from "@/assets/icon.png"
import { PageMetadataTags } from "@/components/page-metadata"
import { buildPageMetadata } from "@/lib/seo/page-metadata"

const landingMetadata = buildPageMetadata({
  title: "Mercury – Write MDX, render it as a presentation.",
  path: "/",
})

const HeroSection = () => (
  <section className="flex flex-row items-center justify-between px-4">
    <div className="mx-auto flex flex-col items-center gap-6 sm:gap-8">
      <img
        src={icon}
        alt="Mercury Icon"
        className="size-32 sm:size-44 md:size-52"
      />
      <h1 className="text-balance text-center font-bold text-4xl sm:text-5xl md:text-6xl">
        Mercury
      </h1>
      <p className="mx-auto max-w-2xl text-balance px-2 text-center text-lg sm:text-xl">
        Write MDX, render it as a presentation.
        <br />
        If you can write MDX and JSX, you can use Mercury.
      </p>
    </div>
  </section>
)

const PlaygroundSection = () => (
  <section className="container flex flex-col gap-6 px-4 sm:gap-8">
    <h2 className="text-balance text-center font-bold text-3xl sm:text-4xl">
      Playground
    </h2>
    <p className="px-2 text-center text-base text-muted-foreground sm:text-lg">
      Try writing some MDX code in the editor and see the preview update in
      real-time.
    </p>
    <iframe
      className="h-[1000px] w-full sm:h-[500px]"
      title="playground section"
      src="/internal/playground-section"
    />
  </section>
)

const LandingPage = () => (
  <div className="my-8 flex flex-1 flex-col items-center gap-8 font-geist sm:my-12 sm:gap-12">
    <PageMetadataTags metadata={landingMetadata} />
    <HeroSection />
    <div className="h-[1px] w-full bg-border" />
    <PlaygroundSection />
  </div>
)

export default LandingPage

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
