import { test, expect } from '@playwright/test'

test('Page title test', async ({ page }) => {
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('No credentials entered error message test', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test('Invalid credentials error message test', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')

  await page.type('#user_login', 'testuser')
  await page.type('#user_password', 'testpassword')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})
