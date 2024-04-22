import { test, expect } from '@playwright/test'

/**
 * Test case to navigate to the about page search for the word counter and enter a text to count the words.
 */
test('should be able to navigate to the word counter and count some characters', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('Type a command or search...').fill("Word Counter")
  await page.click('text=Word Counter')
  await expect(page).toHaveURL('/tools/word-counter')
  await expect(page.locator('span', {hasText: "Word Counter"})).toBeVisible()
  await page.getByLabel('Enter your Text here:').fill("Hello World!")
  await expect(page.getByText('12')).toBeInViewport()
})