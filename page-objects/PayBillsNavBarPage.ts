import { expect, Locator, Page } from '@playwright/test'

export class PayBillsNavBarPage {
  readonly page: Page
  readonly paySavedPayeeTab: Locator
  readonly addNewPayeeTab: Locator
  readonly purchaseForeignCurrencyTab: Locator

  constructor(page: Page) {
    this.page = page
    this.paySavedPayeeTab = page.locator('text="Pay Saved Payee"')
    this.addNewPayeeTab = page.locator('text="Add New Payee"')
    this.purchaseForeignCurrencyTab = page.locator(
      'text="Purchase Foreign Currency"'
    )
  }

  async clickPaySavedPayeeTab() {
    await this.paySavedPayeeTab.click()
  }

  async clickAddNewPayeeTab() {
    await this.addNewPayeeTab.click()
  }

  async clickPurchaseForeignCurrencyTab() {
    await this.purchaseForeignCurrencyTab.click()
  }
}
