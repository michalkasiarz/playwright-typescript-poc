import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaySavedPayeePage } from '../../page-objects/PaySavedPayeePage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/components/TopBarMenuLoggedInUserPage'

test.describe.parallel('Payments tests', () => {
  let landingPage: LandingPage
  let loginPage: LoginPage
  let paySavedPayeePage: PaySavedPayeePage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    paySavedPayeePage = new PaySavedPayeePage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)

    await landingPage.visit()
    await landingPage.clickSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should send new payment', async ({ page }) => {
    await topBarMenuLoggedInUserPage.clickTab('Pay Bills')

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
