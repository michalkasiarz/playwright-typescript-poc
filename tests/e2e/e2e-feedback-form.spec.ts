import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { LandingPage } from '../../page-objects/LandingPage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel('Feedback form', () => {
  let feedbackPage: FeedbackPage
  let landingPage: LandingPage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    feedbackPage = new FeedbackPage(page)
    landingPage = new LandingPage(page)
    loginPage = new LoginPage(page)
    await landingPage.visit()
    await landingPage.clickFeedbackLink()
  })

  test('Reset feedback form test', async ({ page }) => {
    await feedbackPage.fillFeedbackForm(
      'dummy name',
      'dummy@email.com',
      'dummy subject',
      'dummy comment'
    )
    await feedbackPage.clearFeedbackForm()
    await feedbackPage.assertFormReset()
  })

  test('Submit feedback form test', async ({ page }) => {
    await feedbackPage.fillFeedbackForm(
      'dummy name',
      'dummy@email.com',
      'dummy subject',
      'dummy comment'
    )

    await feedbackPage.sendFeedbackForm()
    await page.waitForSelector('#feedback-title')
  })
})
