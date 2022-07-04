import { expect, Locator, Page } from '@playwright/test'

import { BasePage } from '../page-objects/BasePage'

export class FeedbackPage extends BasePage {
  readonly clearButton: Locator
  readonly commentInput: Locator
  readonly emailInput: Locator
  readonly nameInput: Locator
  readonly sendMessageButton: Locator
  readonly subjectInput: Locator

  constructor(page: Page) {
    super(page)
    this.clearButton = page.locator("input[name='clear']")
    this.commentInput = page.locator('#comment')
    this.emailInput = page.locator('#email')
    this.nameInput = page.locator('#name')
    this.sendMessageButton = page.locator("input[value='Send Message']")
    this.subjectInput = page.locator('#subject')
  }

  async assertFormReset() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.emailInput).toBeEmpty()
    await expect(this.subjectInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async clearFeedbackForm() {
    await this.clearButton.click()
  }

  async fillFeedbackForm(
    username: string,
    email: string,
    subject: string,
    comment: string
  ) {
    await this.nameInput.type(username)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(comment)
  }

  async sendFeedbackForm() {
    await this.sendMessageButton.click()
  }
}
