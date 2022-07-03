import { test, expect } from '@playwright/test'

test.describe.parallel('Searchbox tests', () => {
  test('Should find test results', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.type('#searchTerm', 'bank')
    await page.keyboard.press('Enter')

    const numberOfLinks = await page.locator('li > a')
    await expect(numberOfLinks).toHaveCount(2)
  })

  test('Should not find any results', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.type('#searchTerm', 'dummy')
    await page.keyboard.press('Enter')

    const numberOfLinks = await page.locator('text="No results were found for the query: dummy"')
    await expect(numberOfLinks).toHaveCount(1)
  })
})
