import { expect, test } from "../utils/test"

test("to be rendered", async ({ page, serverURL }) => {
  await page.goto(serverURL)
  await expect(page.getByText("Presentation")).toBeVisible()
})
