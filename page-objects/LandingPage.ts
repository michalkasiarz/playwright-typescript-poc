import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../page-objects/BasePage'

export class LandingPage extends BasePage {
  readonly feedbackLink: Locator
  readonly logoutLink: Locator
  readonly searchbox: Locator
  readonly signInButton: Locator
  readonly usernameDropdown: Locator

  constructor(page: Page) {
    super(page)
    this.feedbackLink = page.locator('#feedback')
    this.logoutLink = page.locator('#logout_link')
    this.searchbox = page.locator('#searchTerm')
    this.signInButton = page.locator('#signin_button')
    this.usernameDropdown = page.locator(
      '#settingsBox > ul > li:nth-child(3) > a'
    )
  }

  async clickFeedbackLink() {
    await this.feedbackLink.click()
  }

  async clickLogoutOption() {
    await this.logoutLink.click()
  }

  async clickSignIn() {
    await this.signInButton.click()
  }

  async clickUsername() {
    await this.usernameDropdown.click()
  }

  async searchForPhrase(phrase: string) {
    await this.searchbox.type(phrase)
    await this.page.keyboard.press('Enter')
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }
}
