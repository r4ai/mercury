import { Editor, PlaygroundProvider, Preview } from "@/components/playground"

export const PlaygroundSection = () => (
  <PlaygroundProvider>
    <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-4 sm:gap-8 w-full h-full">
      <Editor height="300px" className="flex-1 sm:h-[500px]" />
      <Preview height="300px" className="flex-1 sm:h-[500px]" />
    </div>
  </PlaygroundProvider>
)

export default PlaygroundSection

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
