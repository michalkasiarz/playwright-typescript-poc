import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly clearButton: Locator
  readonly sendMessageButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.clearButton = page.locator("input[name='clear']")
    this.sendMessageButton = page.locator("input[value='Send Message']")
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

  async clearFeedbackForm() {
    await this.clearButton.click()
  }

  async sendFeedbackForm() {
    await this.sendMessageButton.click()
  }
}
