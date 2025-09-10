import { Editor, PlaygroundProvider, Preview } from "@/components/playground"

export const PlaygroundSection = () => (
  <PlaygroundProvider>
    <div className="grid h-full w-full grid-cols-1 grid-rows-[1fr_1fr] gap-0 sm:grid-cols-[2fr_3fr] sm:grid-rows-1 sm:gap-8">
      <Editor height="500px" className="flex-1 sm:h-[500px]" />
      <Preview height="500px" className="flex-1 sm:h-[500px]" />
    </div>
  </PlaygroundProvider>
)

export default PlaygroundSection

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
