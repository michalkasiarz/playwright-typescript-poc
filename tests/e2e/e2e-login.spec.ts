import { test, expect } from '@playwright/test'

test.describe('Login and logout flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('Login - negative scenario', async ({ page }) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'dummy_user')
    await page.type('#user_password', 'dummypassword')
    await page.click('text=Sign in')

    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })

  test('Login and logout - positive scenario', async ({ page }) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.click('text=username')
    await page.click('text=Logout')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
