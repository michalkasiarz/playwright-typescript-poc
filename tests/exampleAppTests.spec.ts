import { test, expect } from '@playwright/test'
import { loadHomepage, assertTextForElement } from '../helpers'

test.describe
  .parallel('Example.com basic test suite @regressionExample @regression', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page, 'https://www.example.com')
  })

  test('Page heading test', async ({ page }) => {
    const pageHeadingScreenshot = await page.$('h1')
    await assertTextForElement(page, 'h1', 'Example Domain')
    await pageHeadingScreenshot.screenshot({ path: 'headingScreenshot.png' })
  })

  test('Page heading visibility test', async ({ page }) => {
    const pageHeading = await page.locator('h1')
    await expect(pageHeading).toBeVisible()
  })

  test('Page title test', async ({ page }) => {
    await expect(page).toHaveTitle('Example Domains')
  })

  test('URL no redirection test', async ({ page }) => {
    await expect(page).toHaveURL('https://www.example.com')
  })

  test('Removed header non-visibility test', async ({ page }) => {
    const removedHeader = page.locator('text=Removed Domain Name')
    await expect(removedHeader).not.toBeVisible()
  })
})
