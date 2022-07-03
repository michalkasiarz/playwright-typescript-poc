import { expect, Locator, Page } from '@playwright/test'

export async function loadHomepage(page, url) {
  await page.goto(url)
}

export async function assertTextForElement(page, selector, expectedText) {
  await expect(page.locator(selector)).toContainText(expectedText)
}

export async function validateNumberOfLinksFound(
  page: Page,
  selector: string,
  expectedNumber: number
) {
  const numberOfLinks = await page.locator(`${selector}`)
  await expect(numberOfLinks).toHaveCount(expectedNumber)
}
