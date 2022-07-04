import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../BasePage'

export class TopBarMenuLoggedInUserPage extends BasePage {
  readonly accountSummaryTab: Locator
  readonly accountActivityTab: Locator
  readonly transferFundsTab: Locator
  readonly payBillsTab: Locator
  readonly myMoneyMapTab: Locator
  readonly onlineStatementsTab: Locator

  constructor(page: Page) {
    super(page)
    this.accountSummaryTab = page.locator('#account_summary_tab')
    this.accountActivityTab = page.locator('#account_activity_tab')
    this.transferFundsTab = page.locator('#transfer_funds_tab')
    this.payBillsTab = page.locator('#pay_bills_tab')
    this.myMoneyMapTab = page.locator('#pay_bills_tab')
    this.onlineStatementsTab = page.locator('#pay_bills_tab')
  }

  async clickTab(tabname: string) {
    switch (tabname) {
      case 'Account Summary':
        await this.accountSummaryTab.click()
        break
      case 'Account Activity':
        await this.accountActivityTab.click()
        break
      case 'Transfer Funds':
        await this.transferFundsTab.click()
        break
      case 'Pay Bills':
        await this.payBillsTab.click()
        break
      case 'My Money App':
        await this.myMoneyMapTab.click()
        break
      case 'Online Statements':
        await this.onlineStatementsTab.click()
        break
      default:
        throw new Error('Could not find a tab with a given name')
    }
  }
}
