import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'

test.describe.parallel('Searchbox tests', () => {
  let landingPage: LandingPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
  })

  test('Should find test results', async ({ page }) => {
    await landingPage.visit()
    await landingPage.searchForPhrase('bank')

    const numberOfLinks = await page.locator('li > a')
    await expect(numberOfLinks).toHaveCount(2)
  })

  test('Should not find any results', async ({ page }) => {
    await landingPage.visit()
    await landingPage.searchForPhrase('dummy')

    const numberOfLinks = await page.locator(
      'text="No results were found for the query: dummy"'
    )
    await expect(numberOfLinks).toHaveCount(1)
  })
})
