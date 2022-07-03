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
