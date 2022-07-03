import { expect, Locator, Page } from '@playwright/test'

export class LandingPage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchbox: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchbox = page.locator('#searchTerm')
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  async clickOnSignIn() {
    await this.signInButton.click()
  }

  async searchForPhrase(phrase: string) {
    await this.searchbox.type(phrase)
    await this.page.keyboard.press('Enter')
  }
}
