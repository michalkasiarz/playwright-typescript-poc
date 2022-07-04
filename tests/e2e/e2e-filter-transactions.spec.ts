import { test } from '@playwright/test'
import { AccountActivityShowTransactionsPage } from '../../page-objects/AccountActivityShowTransactionsPage'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TopBarMenuLoggedInUserPage } from '../../page-objects/components/TopBarMenuLoggedInUserPage'

test.describe.parallel('Filter transactions tests', () => {
  let accountActivityShowTransactionsPage: AccountActivityShowTransactionsPage
  let landingPage: LandingPage
  let loginPage: LoginPage
  let topBarMenuLoggedInUserPage: TopBarMenuLoggedInUserPage

  test.beforeEach(async ({ page }) => {
    accountActivityShowTransactionsPage =
      new AccountActivityShowTransactionsPage(page)
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    topBarMenuLoggedInUserPage = new TopBarMenuLoggedInUserPage(page)

    await landingPage.visit()
    await landingPage.clickSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Verify results for each account', async ({ page }) => {
    await topBarMenuLoggedInUserPage.clickTab('Account Activity')

    // selecting Checking account
    await accountActivityShowTransactionsPage.selectOptionForAccountDropdown(
      '2'
    )
    await accountActivityShowTransactionsPage.validateNumberOfTransactions(3)
    // selecting Load account
    await accountActivityShowTransactionsPage.selectOptionForAccountDropdown(
      '4'
    )
    await accountActivityShowTransactionsPage.validateNumberOfTransactions(2)
    // selecting Credit Card account
    await accountActivityShowTransactionsPage.selectOptionForAccountDropdown(
      '5'
    )
    await accountActivityShowTransactionsPage.validateNoTransactionsListed()
  })
})
