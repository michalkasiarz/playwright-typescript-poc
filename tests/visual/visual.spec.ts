import { test, expect } from '@playwright/test'

test.describe('Visual regression testing', () => {
  test('Full page snapshot', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png')
  })
})