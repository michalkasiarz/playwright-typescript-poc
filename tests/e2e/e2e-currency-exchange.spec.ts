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

  test('Should purchase foreign currency', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click('text="Purchase Foreign Currency"')

    const currencyDropdown = await page.locator('#pc_currency')
    const todaysSellRate = await page.locator('#sp_sell_rate')
    const amountInput = await page.locator('#pc_amount')
    const selectedCurrencyRadioButton = await page.locator(
      '#pc_inDollars_false'
    )
    const calculateCostsButton = await page.locator('#pc_calculate_costs')
    const conversionAmount = await page.locator('#pc_conversion_amount')
    const purchaseButton = await page.locator('#purchase_cash')

    await currencyDropdown.selectOption('EUR')
    await expect(todaysSellRate).toContainText('EUR')
    await amountInput.type('15')
    await selectedCurrencyRadioButton.check()
    await calculateCostsButton.click()
    await expect(conversionAmount).toContainText('EUR')
    await purchaseButton.click()
    await expect(page.locator('#alert_content')).toHaveText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})
