import { test, expect } from '@playwright/test'

test.describe.parallel('Funds transfer and payments tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Funds transfer from Checking successful scenario', async ({ page }) => {
    await page.click('#transfer_funds_tab')
    let fromAccountDropdown = await page.locator('#tf_fromAccountId')
    let toAccountDropdown = await page.locator('#tf_toAccountId')
    let amountInput = await page.locator('#tf_amount')
    let descriptionInput = await page.locator('#tf_description')
    const submitButton = await page.locator('#btn_submit')

    await fromAccountDropdown.selectOption('2')
    await toAccountDropdown.selectOption('5')
    await amountInput.type('10')
    await descriptionInput.type('for Santa')
    submitButton.click()

    await expect(page).toHaveURL(
      'http://zero.webappsecurity.com/bank/transfer-funds-verify.html'
    )

    await expect(fromAccountDropdown).toHaveAttribute('value', 'Checking')
    await expect(toAccountDropdown).toHaveAttribute('value', 'Credit Card')
    await expect(amountInput).toHaveAttribute('value', '10')
    await expect(descriptionInput).toHaveAttribute('value', 'for Santa')
    await page.click('#btn_submit')

    await expect(page.locator('.alert-success')).toHaveText(
      'You successfully submitted your transaction.'
    )
  })
})
