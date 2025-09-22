import type { Page } from "@playwright/test"
import { expect, test } from "../utils/test"

const gotoPresentation = async (page: Page, serverURL: string) => {
  await page.goto(serverURL, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  })
}

test("to be rendered", async ({ page, serverURL }) => {
  await gotoPresentation(page, serverURL)
  await expect(
    page.getByRole("heading", { level: 1, name: "Presentation" }),
  ).toBeVisible({ timeout: 30_000 })
})

test("slides navigate with control menu", async ({ page, serverURL }) => {
  await gotoPresentation(page, serverURL)

  const counter = page.getByRole("status", { name: "Slide navigation status" })
  const getCounterValues = async () => {
    const text = (await counter.textContent()) ?? ""
    const [current, total] = text
      .split("/")
      .map((value) => Number.parseInt(value.trim(), 10))

    if (Number.isNaN(current) || Number.isNaN(total)) {
      throw new Error(`Unexpected counter text: "${text}"`)
    }

    return { current, total }
  }

  const nextButton = page.getByRole("button", { name: "Next slide" })
  const prevButton = page.getByRole("button", { name: "Previous slide" })

  await expect(
    page.getByRole("heading", { level: 1, name: "Presentation" }),
  ).toBeVisible({ timeout: 30_000 })

  await prevButton.click()
  await expect(
    page.getByRole("heading", { level: 1, name: "Presentation" }),
  ).toBeVisible()
  await expect(counter).toHaveText(/1\s*\/\s*\d+/)

  await nextButton.click()
  await expect(
    page.getByRole("heading", { level: 1, name: "Code" }),
  ).toBeVisible()
  await expect(counter).toHaveText(/2\s*\/\s*\d+/)

  const { total, current: initialIndex } = await getCounterValues()

  for (let index = initialIndex; index < total; index += 1) {
    await nextButton.click()
    await expect(counter).toHaveText(
      new RegExp(`${index + 1}\\s*/\\s*${total}`),
    )
  }

  await expect(
    page.getByRole("heading", { level: 1, name: "TwoColsLayout" }),
  ).toBeVisible()

  const { current } = await getCounterValues()
  expect(current).toBe(total)

  await nextButton.click()
  await expect(counter).toHaveText(new RegExp(`${total}\\s*/\\s*${total}`))
})
