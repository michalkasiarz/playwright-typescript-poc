import { expect, Locator, Page } from '@playwright/test'

export class AccountActivityShowTransactionsPage {
  readonly page: Page
  readonly accountDropdown: Locator
  readonly noResultsFoundInfo: Locator
  readonly singleTransactionRecord: Locator

  constructor(page: Page) {
    this.page = page
    this.accountDropdown = page.locator('#aa_accountId')
    this.noResultsFoundInfo = page.locator('.well')
    this.singleTransactionRecord = page.locator(
      '#all_transactions_for_account tbody tr'
    )
  }

  async selectOptionForAccountDropdown(selectedOption: string) {
    await this.accountDropdown.selectOption(selectedOption)
  }

  async validateNumberOfTransactions(expectedNumberOfTransactions: number) {
    await expect(this.singleTransactionRecord).toHaveCount(
      expectedNumberOfTransactions
    )
  }

  async validateNoTransactionsListed() {
    await expect(this.noResultsFoundInfo).toHaveText('No results.')
  }
}
