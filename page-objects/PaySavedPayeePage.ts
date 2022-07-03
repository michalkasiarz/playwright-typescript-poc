import { expect, Locator, Page } from '@playwright/test'

export class PaySavedPayeePage {
  readonly page: Page
  readonly payeeDropdown: Locator
  readonly payeeDetailsButton: Locator
  readonly payeeDetailsText: Locator
  readonly accountDropdown: Locator
  readonly amountInput: Locator
  readonly datepickerInput: Locator
  readonly descriptionInput: Locator
  readonly payButton: Locator

  constructor(page: Page) {
    this.payeeDropdown = page.locator('#sp_payee')
    this.payeeDetailsButton = page.locator('#sp_get_payee_details')
    this.payeeDetailsText = page.locator('#sp_payee_details')
    this.accountDropdown = page.locator('#sp_account')
    this.amountInput = page.locator('#sp_amount')
    this.datepickerInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.payButton = page.locator('#pay_saved_payees')
  }

  async selectOptionForPayeeDropdown(selectedOption: string) {
    await this.payeeDropdown.selectOption(selectedOption)
  }

  async clickPayeeDetailsButton() {
    await this.payeeDetailsButton.click()
  }

  async selectOptionForAccountDropdown(selectedOption: string) {
    await this.accountDropdown.selectOption(selectedOption)
  }

  async enterAmountDateAndDescription(
    amount: string,
    date: string,
    description: string
  ) {
    await this.amountInput.type(amount)
    await this.datepickerInput.type(date)
    await this.descriptionInput.type(description)
  }

  async validateIfPayeeDetailsAreVisible() {
    await this.payeeDetailsText.isVisible()
  }

  async clickPayButton() {
    await this.payButton.click()
  }
}
