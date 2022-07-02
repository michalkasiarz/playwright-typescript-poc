import { test, expect } from '@playwright/test'

test.describe('Zero.webappsecurity basic test suite @regressionZeroWebApp @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })
  test('No credentials entered error message test', async ({ page }) => {
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })

  test('Invalid credentials error message test', async ({ page }) => {
    await page.click('#signin_button')

    await page.type('#user_login', 'testuser')
    await page.type('#user_password', 'testpassword')
    await page.click('text=Sign in')

    await page.screenshot({ path: 'screenshot.png', fullPage: true })

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })
})
