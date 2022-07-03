import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { LandingPage } from '../../page-objects/LandingPage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback form', () => {
  let loginPage: LoginPage
  let landingPage: LandingPage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    landingPage = new LandingPage(page)
    feedbackPage = new FeedbackPage(page)
    await landingPage.visit()
    await page.click('#feedback')
  })

  test('Reset feedback form test', async ({ page }) => {
    await feedbackPage.fillFeedbackForm(
      'dummy name',
      'dummy@email.com',
      'dummy subject',
      'dummy comment'
    )
    await feedbackPage.clearFeedbackForm()

    await expect(feedbackPage.nameInput).toBeEmpty()
    await expect(feedbackPage.emailInput).toBeEmpty()
    await expect(feedbackPage.subjectInput).toBeEmpty()
    await expect(feedbackPage.commentInput).toBeEmpty()
  })

  test('Submit feedback form test', async ({ page }) => {
    await feedbackPage.fillFeedbackForm(
      'dummy name',
      'dummy@email.com',
      'dummy subject',
      'dummy comment'
    )

    await feedbackPage.sendFeedbackForm()

    await assertTextForElement(
      page,
      '.span6',
      'Thank you for your comments, dummy name. They will be reviewed by our Customer Service staff and given the full attention that they deserve.'
    )
  })
})
