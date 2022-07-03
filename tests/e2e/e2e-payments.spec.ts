import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/TopBarMenuLoggedInUserPage'
import { PaySavedPayeePage } from '../../page-objects/PaySavedPayeePage'

test.describe.parallel('Payments tests', () => {
  let landingPage: LandingPage
  let loginPage: LoginPage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage
  let paySavedPayeePage: PaySavedPayeePage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)
    paySavedPayeePage = new PaySavedPayeePage(page)

    await landingPage.visit()
    await landingPage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should send new payment', async ({ page }) => {
    await topBarMenuLoggedInUserPage.clickPayBillsTab()

    await paySavedPayeePage.selectOptionForPayeeDropdown('apple')
    await paySavedPayeePage.clickPayeeDetailsButton()
    await paySavedPayeePage.validateIfPayeeDetailsAreVisible()
    // selecting Brokerage
    await paySavedPayeePage.selectOptionForAccountDropdown('6')
    await paySavedPayeePage.enterAmountDateAndDescription(
      '12',
      '2022-07-07',
      'test of payments'
    )
    await paySavedPayeePage.clickPayButton()

    const messageAfterPayment = await page.locator('#alert_content > span')
    await expect(messageAfterPayment).toBeVisible()
    await expect(messageAfterPayment).toHaveText(
      'The payment was successfully submitted.'
    )
  })
})
