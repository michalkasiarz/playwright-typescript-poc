import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PayBillsNavBarPage } from '../../page-objects/components/PayBillsNavBarPage'
import { PurchaseForeignCurrencyPage } from '../../page-objects/PurchaseForeignCurrencyPage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/components/TopBarMenuLoggedInUserPage'

test.describe.parallel('Currency exchagne tests', () => {
  let landingPage: LandingPage
  let loginPage: LoginPage
  let payBillsNavBarPage: PayBillsNavBarPage
  let purchaseForeignCurrencyPage: PurchaseForeignCurrencyPage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    payBillsNavBarPage = new PayBillsNavBarPage(page)
    purchaseForeignCurrencyPage = new PurchaseForeignCurrencyPage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)

    await landingPage.visit()
    await landingPage.clickSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should purchase foreign currency', async ({ page }) => {
    await topBarMenuLoggedInUserPage.clickTab('Pay Bills')
    await payBillsNavBarPage.clickTab('Purchase Foreign Currency')

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
