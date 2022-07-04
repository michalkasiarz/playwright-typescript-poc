import { expect, Locator, Page } from '@playwright/test'

export class TopBarMenuLoggedInUserPage {
  readonly page: Page
  readonly accountSummaryTab: Locator
  readonly accountActivityTab: Locator
  readonly transferFundsTab: Locator
  readonly payBillsTab: Locator
  readonly myMoneyMapTab: Locator
  readonly onlineStatementsTab: Locator

  constructor(page: Page) {
    this.page = page
    this.accountSummaryTab = page.locator('#account_summary_tab')
    this.accountActivityTab = page.locator('#account_activity_tab')
    this.transferFundsTab = page.locator('#transfer_funds_tab')
    this.payBillsTab = page.locator('#pay_bills_tab')
    this.myMoneyMapTab = page.locator('#pay_bills_tab')
    this.onlineStatementsTab = page.locator('#pay_bills_tab')
  }

  async clickAccountSummaryTab() {
    await this.accountSummaryTab.click()
  }

  async clickAccountActivityTab() {
    await this.accountActivityTab.click()
  }

  async clickTransferFundsTab() {
    await this.transferFundsTab.click()
  }

  async clickPayBillsTab() {
    await this.payBillsTab.click()
  }

  async clickMyMoneyMapTab() {
    await this.myMoneyMapTab.click()
  }

  async clickOnlineStatementsTab() {
    await this.onlineStatementsTab.click()
  }
}
