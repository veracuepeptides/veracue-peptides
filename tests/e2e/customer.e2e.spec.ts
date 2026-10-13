import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { test, expect, type Page } from '@playwright/test'

// The package is an ES module, so the message file is read at runtime instead of imported as JSON.
const messages = JSON.parse(readFileSync(fileURLToPath(new URL('../../messages/en.json', import.meta.url)), 'utf8'))

const BASE = 'http://localhost:3100'
const shop = messages.checkout.cartClient
const checkoutText = messages.checkout.checkoutClient as Record<string, string>

// Visitors who have already passed the 18+ gate skip it through the same cookie the gate sets.
async function passAgeGate(page: Page) {
  await page.context().addCookies([{ name: 'age_verified', value: 'true', url: BASE }])
}

test.describe('age gate', () => {
  test('a first visit asks for age; confirming hides the gate and it stays hidden on reload', async ({ page }) => {
    await page.goto('/')
    const gate = page.getByRole('dialog').first()
    await expect(gate).toBeVisible()
    await page.getByRole('button', { name: messages.ageGate.confirmButton }).click()
    await expect(gate).toBeHidden({ timeout: 10_000 })
    await page.reload()
    await expect(page.getByRole('dialog').first()).toBeHidden()
  })

  test('declaring under 18 shows the refusal and keeps the gate in place', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: messages.ageGate.denyButton }).click()
    await expect(page.getByText(messages.ageGate.deniedTitle).first()).toBeVisible()
    await expect(page.getByRole('dialog').first()).toBeVisible()
  })
})

test.describe('homepage', () => {
  test('the military discount section shows the 15% offer', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/')
    await expect(page.getByText('15% OFF').first()).toBeAttached()
    await expect(page.getByText('30% OFF')).toHaveCount(0)
  })
})

test.describe('cart', () => {
  test('a customer adds a product, sees it in the cart, and removes it', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/product/snap8')
    await page.getByRole('button', { name: messages.shop.productDetail.addToCart }).first().click()
    // Wait for the mini cart to open before navigating, so the add-to-cart request finishes first.
    const drawer = page.getByRole('heading', { name: 'Shopping Bag' })
    await expect(drawer).toBeVisible({ timeout: 15_000 })

    // The drawer must not come back on its own after a reload, or it would cover the page.
    await page.reload()
    await expect(drawer).toBeHidden()

    await page.goto('/cart')
    const main = page.getByRole('main')
    await expect(main.getByRole('heading', { level: 1, name: /shopping cart/i })).toBeVisible()
    await expect(main.getByRole('link', { name: 'Snap8', exact: true }).first()).toBeVisible()

    await main.getByRole('button', { name: shop.removeItemAria }).first().click()
    await expect(main.getByRole('heading', { level: 1, name: /shopping cart is empty/i })).toBeVisible()
  })
})

test.describe('header search', () => {
  test('one character shows no products, two characters find Snap8', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/')
    // The page can take a moment to hydrate, so the click is retried until the overlay opens.
    const overlay = page.getByRole('dialog', { name: 'Search products' })
    await expect(async () => {
      await page.getByRole('button', { name: 'Search products' }).first().click()
      await expect(overlay).toBeVisible({ timeout: 2_000 })
    }).toPass({ timeout: 20_000 })
    // Each result is a row marked data-result-index; the count line reads "N Syntheses Found" when there are matches.
    const rows = overlay.locator('[data-result-index]')
    const resultsLine = overlay.getByText(/^\d+ Syntheses Found$/)
    const input = overlay.getByRole('textbox').first()
    await input.fill('s')
    await page.waitForTimeout(800)
    await expect(rows).toHaveCount(0)
    await expect(resultsLine).toHaveCount(0)
    await input.fill('snap')
    await expect(resultsLine).toBeVisible({ timeout: 15_000 })
    await expect(rows.filter({ hasText: /snap8/i }).first()).toBeVisible()
  })
})

test.describe('account access and sign-in', () => {
  test('a wrong password is refused with the standard message', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/login')
    await page.locator('input[type="email"]').first().fill('nobody-qa@example.com')
    await page.locator('input[type="password"]').first().fill('not-the-password')
    await page.locator('button[type="submit"]').first().click()
    await expect(page.getByText(messages.auth.login.invalidCredentials)).toBeVisible({ timeout: 15_000 })
  })

  test('the account pages send a visitor to sign in', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/account')
    await expect(page).toHaveURL(/login/)
  })
})

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('opens from the header and closes with Escape', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/')
    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    const menu = page.getByRole('dialog', { name: 'Navigation menu' })
    await expect(menu).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
  })
})

test.describe('checkout (Zelle, manual payment)', () => {
  test('a customer places a Zelle order from the checkout form', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/product/snap8')
    await page.getByRole('button', { name: messages.shop.productDetail.addToCart }).first().click()
    await expect(page.getByRole('heading', { name: 'Shopping Bag' })).toBeVisible({ timeout: 15_000 })
    await page.goto('/checkout')
    // The checkout loads its saved cart before the form is interactive, so wait for the network to settle first.
    await page.waitForLoadState('networkidle')

    const main = page.getByRole('main')
    const field = (label: string) => main.getByRole('textbox', { name: label, exact: true })
    const email = `qa-test-e2e-${Date.now()}@example.com`
    await field(checkoutText.emailAddress).fill(email)
    await field(checkoutText.firstName).fill('QA')
    await field(checkoutText.lastName).fill('Browser')
    await field(checkoutText.address).fill('1 Browser Way')
    await field(checkoutText.city).fill('Boston')
    await field(checkoutText.state).fill('MA')
    await field(checkoutText.zipCode).fill('02118')
    await field(checkoutText.phoneForDelivery).fill('5555550100')

    // Zelle is the default payment choice, so the order is placed as a manual Zelle payment.
    await main.getByRole('button', { name: checkoutText.placeOrder, exact: true }).click()
    await expect(page).toHaveURL(/order-confirmation\//, { timeout: 60_000 })
    await expect(page.getByRole('heading', { level: 1, name: 'Order Placed' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: /Complete Your Zelle Payment/ })).toBeVisible()
  })
})

test.describe('sign-in gates on member pages', () => {
  test('the affiliate dashboard sends a visitor to sign in', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/affiliates/dashboard')
    await expect(page).toHaveURL(/login/)
  })

  test('the wishlist sends a visitor through to sign in', async ({ page }) => {
    await passAgeGate(page)
    await page.goto('/wishlist')
    await expect(page).toHaveURL(/login/)
  })
})

test.describe('email verification link', () => {
  test('a bad token is sent back to sign-in with an error, without following the redirect off-site', async ({ request }) => {
    const res = await request.get('/api/verify-email?token=not-a-real-token', { maxRedirects: 0 })
    expect(res.status()).toBeGreaterThanOrEqual(300)
    expect(res.status()).toBeLessThan(400)
    expect(res.headers()['location']).toContain('/login?verifyError=invalid_token')
  })

  test('a link with no token is sent back to sign-in with a missing-token error', async ({ request }) => {
    const res = await request.get('/api/verify-email', { maxRedirects: 0 })
    expect(res.headers()['location']).toContain('verifyError=missing_token')
  })
})

test.describe('staff-only routes', () => {
  test('the staff notification counts refuse anonymous visitors', async ({ request }) => {
    const res = await request.get('/api/notifications', { maxRedirects: 0 })
    expect(res.status()).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })
})

test.describe('blog', () => {
  test('the blog index loads for a visitor', async ({ page }) => {
    await passAgeGate(page)
    // Third-party assets on the page can stall the load event, so wait for the document only.
    const res = await page.goto('/blog', { waitUntil: 'domcontentloaded' })
    expect(res?.status()).toBe(200)
  })

  test('an unknown or unpublished post address is a not-found page', async ({ page }) => {
    await passAgeGate(page)
    const res = await page.goto('/blog/qa-no-such-post-slug', { waitUntil: 'domcontentloaded' })
    expect(res?.status()).toBe(404)
  })
})
