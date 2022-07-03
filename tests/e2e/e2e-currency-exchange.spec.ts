import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/TopBarMenuLoggedInUserPage'
import { PayBillsNavBarPage } from '../../page-objects/PayBillsNavBarPage'
import { PurchaseForeignCurrencyPage } from '../../page-objects/PurchaseForeignCurrencyPage'

test.describe.parallel('Currency exchagne tests', () => {
  let landingPage: LandingPage
  let loginPage: LoginPage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage
  let payBillsNavBarPage: PayBillsNavBarPage
  let purchaseForeignCurrencyPage: PurchaseForeignCurrencyPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)
    payBillsNavBarPage = new PayBillsNavBarPage(page)
    purchaseForeignCurrencyPage = new PurchaseForeignCurrencyPage(page)

    await landingPage.visit()
    await landingPage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should purchase foreign currency', async ({ page }) => {
    await topBarMenuLoggedInUserPage.clickPayBillsTab()
    await payBillsNavBarPage.clickPurchaseForeignCurrencyTab()

    await purchaseForeignCurrencyPage.selectOptionForCurrencyDropdown('EUR')
    await purchaseForeignCurrencyPage.validateTodaysSellRate('1 euro (EUR)')
    await purchaseForeignCurrencyPage.enterAmount('15')
    await purchaseForeignCurrencyPage.checkSelectedCurrencyRadioButton()
    await purchaseForeignCurrencyPage.clickCalculateCostsButton()
    await purchaseForeignCurrencyPage.validateConversionAmountText('euro (EUR)')
    await purchaseForeignCurrencyPage.clickPurchaseButton()

    await expect(page.locator('#alert_content')).toHaveText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})
