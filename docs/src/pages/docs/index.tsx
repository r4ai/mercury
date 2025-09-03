const DocsPage = () => (
  <div className="text-center h-full grid place-items-center">
    Work in Progress...
  </div>
)

export default DocsPage

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
