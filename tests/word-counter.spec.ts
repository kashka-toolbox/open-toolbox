import { test, expect } from '@playwright/test'

/**
 * Test case to navigate to the about page search for the word counter and enter a text to count the words.
 */
test('should be able to navigate to the word counter and count some characters', async ({ page, baseURL }) => {
  await page.goto('./en/')
  await page.getByPlaceholder('Search a tool here...').first().fill("Word Counter")
  await page.click('text=Word Counter')
  await expect(page).toHaveURL(new RegExp(`${baseURL}/.{2}/word-counter`));
  await expect(page.locator('label', {hasText: "Enter your Text here:"})).toBeVisible()
  await page.getByLabel('Enter your Text here:').fill("Hello World!")
  await expect(page.getByText('12')).toBeInViewport()
})