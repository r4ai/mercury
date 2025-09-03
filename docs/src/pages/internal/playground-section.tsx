import { Editor, PlaygroundProvider, Preview } from "@/components/playground"

export const PlaygroundSection = () => (
  <PlaygroundProvider>
    <div className="grid grid-cols-[2fr_3fr] gap-8 w-full h-full">
      <Editor height="500px" className="flex-1" />
      <Preview className="flex-1 h-[500px]" />
    </div>
  </PlaygroundProvider>
)

export default PlaygroundSection

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
