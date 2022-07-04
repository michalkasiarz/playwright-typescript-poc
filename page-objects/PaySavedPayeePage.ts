import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../page-objects/BasePage'

export class PaySavedPayeePage extends BasePage {
  readonly accountDropdown: Locator
  readonly amountInput: Locator
  readonly datepickerInput: Locator
  readonly descriptionInput: Locator
  readonly payButton: Locator
  readonly payeeDropdown: Locator
  readonly payeeDetailsButton: Locator
  readonly payeeDetailsText: Locator

  constructor(page: Page) {
    super(page)
    this.accountDropdown = page.locator('#sp_account')
    this.amountInput = page.locator('#sp_amount')
    this.datepickerInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.payButton = page.locator('#pay_saved_payees')
    this.payeeDropdown = page.locator('#sp_payee')
    this.payeeDetailsButton = page.locator('#sp_get_payee_details')
    this.payeeDetailsText = page.locator('#sp_payee_details')
  }

  async clickPayButton() {
    await this.payButton.click()
  }

  async clickPayeeDetailsButton() {
    await this.payeeDetailsButton.click()
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

  async selectOptionForAccountDropdown(selectedOption: string) {
    await this.accountDropdown.selectOption(selectedOption)
  }

  async selectOptionForPayeeDropdown(selectedOption: string) {
    await this.payeeDropdown.selectOption(selectedOption)
  }

  async validateIfPayeeDetailsAreVisible() {
    await this.payeeDetailsText.isVisible()
  }
}
