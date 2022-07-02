import { test, expect } from '@playwright/test'

test('Page heading test', async ({ page }) => {
  await page.goto('https://www.example.com')
  const pageHeading = await page.locator('h1')
  await expect(pageHeading).toHaveText('Example Domain')
})

test('Page heading visibility test', async ({ page }) => {
  await page.goto('https://www.example.com')
  const pageHeading = await page.locator('h1')
  await expect(pageHeading).toBeVisible()
})

test('Page title test', async ({ page }) => {
  await page.goto('https://www.example.com')
  await expect(page).toHaveTitle('Example Domain')
})

test('No credentials entered error message test', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toHaveText('Login and/or password are wrong.')
})

test('Invalid credentials error message test', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')

  await page.type('#user_login', 'testuser')
  await page.type('#user_password', 'testpassword')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toHaveText('Login and/or password are wrong.')
})

test('URL no redirection test', async ({ page }) => {
  await page.goto('https://www.example.com')
  await expect(page).toHaveURL('https://www.example.com')
})
