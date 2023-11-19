import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Acme Dashboard/);
});

test.describe('navigation for unauhtorized user', () => {
  test('navigation to homepage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveTitle(/Acme Dashboard/);
    await expect(
      page.getByRole('heading', { name: 'Please log in to continue.' })
    ).toBeVisible();
  });

  test('navigation to dashboard page', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/Acme Dashboard/);
    await expect(
      page.getByRole('heading', { name: 'Please log in to continue.' })
    ).toBeVisible();
  });

  test('navigation to invoices page', async ({ page }) => {
    await page.goto('/dashboard/invoices');
    await expect(page).toHaveTitle(/Acme Dashboard/);
    await expect(
      page.getByRole('heading', { name: 'Please log in to continue.' })
    ).toBeVisible();
  });

  test('navigation to customers page', async ({ page }) => {
    await page.goto('/dashboard/customers');
    await expect(page).toHaveTitle(/Acme Dashboard/);
    await expect(
      page.getByRole('heading', { name: 'Please log in to continue.' })
    ).toBeVisible();
  });
});

test.describe('navigation for auhtorized user', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('navigation to homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Overview | Acme Dashboard/);
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Recent Revenue' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Latest Invoices' })
    ).toBeVisible();
  });

  test('navigation to invoice page', async ({ page }) => {
    await page.goto('/dashboard/invoices');

    await expect(page).toHaveTitle(/Invoices | Acme Dashboard/);
    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();

    // TODO: add test for Search functionality
  });

  test('navigation to customers page', async ({ page }) => {
    await page.goto('/dashboard/customers');

    await expect(page).toHaveTitle(/Customers | Acme Dashboard/);
    await expect(
      page.getByRole('heading', { name: 'Customers' })
    ).toBeVisible();

    // TODO: add test for Search functionality
  });
});
