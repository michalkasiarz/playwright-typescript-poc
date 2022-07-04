import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../page-objects/BasePage'

export class PurchaseForeignCurrencyPage extends BasePage {
  readonly amountInput: Locator
  readonly calculateCostsButton: Locator
  readonly currencyDropdown: Locator
  readonly conversionAmount: Locator
  readonly purchaseButton: Locator
  readonly selectedCurrencyRadioButton: Locator
  readonly todaysSellRate: Locator

  constructor(page: Page) {
    super(page)
    this.amountInput = page.locator('#pc_amount')
    this.calculateCostsButton = page.locator('#pc_calculate_costs')
    this.currencyDropdown = page.locator('#pc_currency')
    this.conversionAmount = page.locator('#pc_conversion_amount')
    this.purchaseButton = page.locator('#purchase_cash')
    this.selectedCurrencyRadioButton = page.locator('#pc_inDollars_false')
    this.todaysSellRate = page.locator('#sp_sell_rate')
  }

  async checkSelectedCurrencyRadioButton() {
    await this.selectedCurrencyRadioButton.check()
  }

  async clickCalculateCostsButton() {
    await this.calculateCostsButton.click()
  }

  async clickPurchaseButton() {
    await this.purchaseButton.click()
  }

  async enterAmount(amount: string) {
    await this.amountInput.type(amount)
  }

  async selectOptionForCurrencyDropdown(selectedOption: string) {
    await this.currencyDropdown.selectOption(selectedOption)
  }

  async validateConversionAmountText(expectedText: string) {
    await expect(this.conversionAmount).toContainText(expectedText)
  }

  async validateTodaysSellRate(expectedText: string) {
    await expect(this.todaysSellRate).toContainText(expectedText)
  }
}
