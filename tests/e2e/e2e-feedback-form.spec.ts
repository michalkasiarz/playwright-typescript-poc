import { test, expect } from '@playwright/test'

test.describe('Feedback form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#feedback')
  })

  test('Reset feedback form test', async ({ page }) => {
    const nameInput = await page.locator('#name')
    const emailInput = await page.locator('#email')
    const subjectInput = await page.locator('#subject')
    const commentInput = await page.locator('#comment')

    await nameInput.type('dummy name')
    await emailInput.type('dummy email')
    await subjectInput.type('dummy subject')
    await commentInput.type('dummy comment')

    await page.click('input[name="clear"]')

    await expect(nameInput).toBeEmpty()
    await expect(emailInput).toBeEmpty()
    await expect(subjectInput).toBeEmpty()
    await expect(commentInput).toBeEmpty()
  })
})
