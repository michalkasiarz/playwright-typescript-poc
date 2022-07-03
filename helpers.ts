import { expect } from '@playwright/test'

export async function loadHomepage(page, url) {
  await page.goto(url)
}

export async function assertTextForElement(page, selector, expectedText) {
  await expect(page.locator(selector)).toContainText(expectedText)
}
