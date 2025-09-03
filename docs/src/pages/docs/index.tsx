const DocsPage = () => <div>Docs</div>

export default DocsPage

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
