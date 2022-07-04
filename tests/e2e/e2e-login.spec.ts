import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/components/TopBarMenuLoggedInUserPage'

test.describe.parallel('Login and logout flow @login', () => {
  let landingPage: LandingPage
  let loginPage: LoginPage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)
    await landingPage.visit()
  })

  test('Login - negative scenario', async ({ page }) => {
    await landingPage.clickSignIn()
    await loginPage.login('dummy username', 'dummy password')
    await loginPage.assertErrorMessage('Login and/or password are wrong.')
  })

  test('Login and logout - positive scenario', async ({ page }) => {
    await landingPage.clickSignIn()
    await loginPage.login('username', 'password')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    await topBarMenuLoggedInUserPage.accountSummaryTab.isVisible()

    await landingPage.clickUsername()
    await landingPage.clickLogoutOption()

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
