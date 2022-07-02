import { test, expect } from '@playwright/test'
import { loadHomepage, assertTextForElement } from '../helpers'

test.describe('Example.com basic test suite @regressionExample @regression', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomepage(page, 'https://www.example.com')
  })

  test('Page heading test', async ({ page }) => {
    const pageHeadingScreenshot = await page.$('h1')
    await assertTextForElement(page, 'h1', 'Example Domain')
    await pageHeadingScreenshot.screenshot({ path: 'headingScreenshot.png' })
  })

  test('Page heading visibility test', async ({ page }) => {
    const pageHeading = await page.locator('h1')
    await expect(pageHeading).toBeVisible()
  })

  test('Page title test', async ({ page }) => {
    await expect(page).toHaveTitle('Example Domain')
  })

  test('URL no redirection test', async ({ page }) => {
    await expect(page).toHaveURL('https://www.example.com')
  })

  test('Removed header non-visibility test', async ({ page }) => {
    const removedHeader = page.locator('text=Removed Domain Name')
    await expect(removedHeader).not.toBeVisible()
  })
})

test.describe('Zero.webappsecurity basic test suite @regressionZeroWebApp @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })
  test('No credentials entered error message test', async ({ page }) => {
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })

  test('Invalid credentials error message test', async ({ page }) => {
    await page.click('#signin_button')

    await page.type('#user_login', 'testuser')
    await page.type('#user_password', 'testpassword')
    await page.click('text=Sign in')

    await page.screenshot({ path: 'screenshot.png', fullPage: true })

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })
})
