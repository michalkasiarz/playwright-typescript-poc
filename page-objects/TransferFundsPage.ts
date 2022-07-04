import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../page-objects/BasePage'

export class TransferFundsPage extends BasePage {
  readonly amountInput: Locator
  readonly descriptionInput: Locator
  readonly fromAccountDropdown: Locator
  readonly submitButton: Locator
  readonly toAccountDropdown: Locator

  constructor(page: Page) {
    super(page)
    this.amountInput = page.locator('#tf_amount')
    this.descriptionInput = page.locator('#tf_description')
    this.fromAccountDropdown = page.locator('#tf_fromAccountId')
    this.submitButton = page.locator('#btn_submit')
    this.toAccountDropdown = page.locator('#tf_toAccountId')
  }

  async clickContinueButton() {
    await this.submitButton.click()
  }

  async enterAmountAndDescription(amount: string, description: string) {
    await this.amountInput.type(amount)
    await this.descriptionInput.type(description)
  }

  async selectOptionFromAccountDropdown(selectedOption: string) {
    await this.fromAccountDropdown.selectOption(selectedOption)
  }

  async selectOptionToAccountDropdown(selectedOption: string) {
    await this.toAccountDropdown.selectOption(selectedOption)
  }

  async validateFieldContent(field: Locator, expectedValue: string) {
    await expect(field).toHaveAttribute('value', expectedValue)
  }
}
