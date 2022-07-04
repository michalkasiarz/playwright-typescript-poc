import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly errorMessage: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly usernameInput: Locator

  constructor(page: Page) {
    super(page)
    this.errorMessage = page.locator('.alert-error')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.usernameInput = page.locator('#user_login')
  }

  async assertErrorMessage(errorMessage: string) {
    await expect(this.errorMessage).toHaveText(errorMessage)
  }

  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
  }
}
