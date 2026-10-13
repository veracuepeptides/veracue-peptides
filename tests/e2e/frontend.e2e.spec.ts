import { test, expect } from '@playwright/test'

// Replaces the Payload blank-template check (wrong port, wrong title, wrong heading) with this site's homepage.
test.describe('Frontend', () => {
  test('the homepage loads with the research peptide hero', async ({ page }) => {
    await page.context().addCookies([{ name: 'age_verified', value: 'true', url: 'http://localhost:3100' }])
    await page.goto('/')

    await expect(page).toHaveTitle(/Research Peptides/i)
    await expect(page.locator('h1').first()).toContainText(/peptides/i)
  })
})
