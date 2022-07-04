import { expect, Locator, Page } from '@playwright/test'

export class PayBillsNavBarPage {
  readonly page: Page
  readonly addNewPayeeTab: Locator
  readonly paySavedPayeeTab: Locator
  readonly purchaseForeignCurrencyTab: Locator

  constructor(page: Page) {
    this.page = page
    this.addNewPayeeTab = page.locator('text="Add New Payee"')
    this.paySavedPayeeTab = page.locator('text="Pay Saved Payee"')
    this.purchaseForeignCurrencyTab = page.locator(
      'text="Purchase Foreign Currency"'
    )
  }

  async clickAddNewPayeeTab() {
    await this.addNewPayeeTab.click()
  }

  async clickPaySavedPayeeTab() {
    await this.paySavedPayeeTab.click()
  }

  async clickPurchaseForeignCurrencyTab() {
    await this.purchaseForeignCurrencyTab.click()
  }
}
