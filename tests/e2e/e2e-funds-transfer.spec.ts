import { test, expect } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/TopBarMenuLoggedInUserPage'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'

test.describe.parallel('Funds transfer tests', () => {
  let landingPage: LandingPage
  let loginPage: LoginPage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage
  let transferFundsPage: TransferFundsPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)
    transferFundsPage = new TransferFundsPage(page)

    await landingPage.visit()
    await landingPage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Funds transfer from Checking successful scenario', async ({ page }) => {
    await topBarMenuLoggedInUserPage.clickTransferFundsTab()
    await transferFundsPage.selectOptionFromAccountDropdown('2')
    await transferFundsPage.selectOptionToAccountDropdown('5')
    await transferFundsPage.enterAmountAndDescription('10', 'for Santa')
    await transferFundsPage.clickContinueButton()

    await expect(page).toHaveURL(
      'http://zero.webappsecurity.com/bank/transfer-funds-verify.html'
    )

    await transferFundsPage.validateFieldContent(
      transferFundsPage.fromAccountDropdown,
      'Checking'
    )
    await transferFundsPage.validateFieldContent(
      transferFundsPage.toAccountDropdown,
      'Credit Card'
    )
    await transferFundsPage.validateFieldContent(
      transferFundsPage.amountInput,
      '10'
    )
    await transferFundsPage.validateFieldContent(
      transferFundsPage.descriptionInput,
      'for Santa'
    )

    await transferFundsPage.clickContinueButton()

    await expect(page.locator('.alert-success')).toHaveText(
      'You successfully submitted your transaction.'
    )
  })
})
