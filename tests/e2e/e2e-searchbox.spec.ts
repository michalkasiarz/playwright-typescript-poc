import { test } from '@playwright/test'
import { LandingPage } from '../../page-objects/LandingPage'
import { validateNumberOfLinksFound } from '../../helpers'

test.describe.parallel('Searchbox tests', () => {
  let landingPage: LandingPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
  })

  test('Should find test results', async ({ page }) => {
    await landingPage.visit()
    await landingPage.searchForPhrase('bank')

    await validateNumberOfLinksFound(page, 'li > a', 2)
  })

  test('Should not find any results', async ({ page }) => {
    await landingPage.visit()
    await landingPage.searchForPhrase('dummy')

    await validateNumberOfLinksFound(
      page,
      'text="No results were found for the query: dummy"',
      1
    )
  })
})
