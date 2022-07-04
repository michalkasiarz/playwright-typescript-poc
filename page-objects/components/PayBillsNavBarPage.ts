import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../BasePage'

export class PayBillsNavBarPage extends BasePage{
  readonly addNewPayeeTab: Locator
  readonly paySavedPayeeTab: Locator
  readonly purchaseForeignCurrencyTab: Locator

  constructor(page: Page) {
    super(page)
    this.addNewPayeeTab = page.locator('text="Add New Payee"')
    this.paySavedPayeeTab = page.locator('text="Pay Saved Payee"')
    this.purchaseForeignCurrencyTab = page.locator(
      'text="Purchase Foreign Currency"'
    )
  }

  async clickTab(tabname: string) {
    switch (tabname) {
      case 'Add New Payee':
        await this.addNewPayeeTab.click()
        break
      case 'Pay Saved Payee':
        await this.paySavedPayeeTab.click()
        break
      case 'Purchase Foreign Currency':
        await this.purchaseForeignCurrencyTab.click()
        break
      default:
        throw new Error('Could not find a tab with a given name')
    }
  }
}
