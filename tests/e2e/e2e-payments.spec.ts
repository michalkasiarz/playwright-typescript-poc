import { test, expect } from '@playwright/test'

test.describe.parallel('Payments tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    let payeeDropdown = await page.locator('#sp_payee')
    let payeeDetailsButton = await page.locator('#sp_get_payee_details')
    let payeeDetailsText = await page.locator('#sp_payee_details')
    let accountDropdown = await page.locator('#sp_account')
    let amountInput = await page.locator('#sp_amount')
    let datepickerInput = await page.locator('#sp_date')
    let descriptionInput = await page.locator('#sp_description')
    const payButton = await page.locator('#pay_saved_payees')

    await payeeDropdown.selectOption('apple')
    await payeeDetailsButton.click()
    await payeeDetailsText.isVisible()
    // selecting Brokerage
    await accountDropdown.selectOption('6')
    await amountInput.type('12')
    await datepickerInput.type('2022-07-07')
    await descriptionInput.type('test of payments')
    await payButton.click()

    const messageAfterPayment = await page.locator('#alert_content > span')
    await expect(messageAfterPayment).toBeVisible()
    await expect(messageAfterPayment).toHaveText(
      'The payment was successfully submitted.'
    )
  })
})
