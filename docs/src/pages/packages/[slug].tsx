const PackagePage = () => (
  <div className="text-center h-full grid place-items-center">
    Work in Progress...
  </div>
)

export default PackagePage

export const getConfig = async () => {
  return {
    render: "static",
    staticPaths: ["mercury-ui", "remark-mercury", "vite-plugin-mercury"],
  } as const
}
