import { test, expect } from '@playwright/test'

test.describe.parallel('Filter transactions tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Verify results for each account', async ({ page }) => {
    await page.click('#account_activity_tab')
    let accountDropdown = await page.locator('#aa_accountId')

    // selecting Checking account
    await accountDropdown.selectOption('2')
    const checkingAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(checkingAccount).toHaveCount(3)

    // selecting Load account
    await accountDropdown.selectOption('4')
    await expect(checkingAccount).toHaveCount(2)

    // selecting Credit Card account
    await accountDropdown.selectOption('5')
    await expect(page.locator('.well')).toHaveText('No results.')
  })
})
