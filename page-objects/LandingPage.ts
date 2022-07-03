import { expect, Locator, Page } from '@playwright/test'

export class LandingPage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchbox: Locator
  readonly feedbackLink: Locator
  readonly usernameDropdown: Locator
  readonly logoutLink: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator('#signin_button')
    this.searchbox = page.locator('#searchTerm')
    this.feedbackLink = page.locator('#feedback')
    this.usernameDropdown = page.locator(
      '#settingsBox > ul > li:nth-child(3) > a'
    )
    this.logoutLink = page.locator('#logout_link')
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  async clickOnSignIn() {
    await this.signInButton.click()
  }

  async clickLogoutOption() {
    await this.logoutLink.click()
  }

  async clickOnUsername() {
    await this.usernameDropdown.click()
  }

  async clickOnFeedbackLink() {
    await this.feedbackLink.click()
  }

  async searchForPhrase(phrase: string) {
    await this.searchbox.type(phrase)
    await this.page.keyboard.press('Enter')
  }
}
