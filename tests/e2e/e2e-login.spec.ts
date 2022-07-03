import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { LandingPage } from '../../page-objects/LandingPage'

test.describe.parallel('Login and logout flow', () => {
  let loginPage: LoginPage
  let landingPage: LandingPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    landingPage = new LandingPage(page)
    await landingPage.visit()
  })

  test('Login - negative scenario', async ({ page }) => {
    await landingPage.clickOnSignIn()
    await loginPage.login('dummy username', 'dummy password')
    await loginPage.assertErrorMessage('Login and/or password are wrong.')
  })

  test('Login and logout - positive scenario', async ({ page }) => {
    await landingPage.clickOnSignIn()
    await loginPage.login('username', 'password')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.click('text=username')
    await page.click('text=Logout')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
