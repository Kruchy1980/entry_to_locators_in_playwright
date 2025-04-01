import { SESSION_PATH, SESSION_PATH_SETUP } from '@_pw-config';
import { test, expect } from '@playwright/test';

test.describe('Navigation buttons for logged in user - users handling', () => {
  test.use({ storageState: SESSION_PATH });
  test('Switch to users page', async ({ page }) => {
    // Arrange:
    await page.goto('/welcome/');
    // Act:
    // await expect(page.getByTestId('hello')).toBeVisible();
    await page.getByTestId('open-users').click();
    // // Assert:
    // const title = await page.title();
    expect(await page.title()).toContain('Users');
  });
  test.describe('Navigation buttons for logged in user - statisitc handling', () => {
    test.use({ storageState: SESSION_PATH_SETUP });
    test('Switch to stats page', async ({ page }) => {
      // Arrange:
      await page.goto('/welcome/');
      // Act:
      // await expect(page.getByTestId('hello')).toBeVisible();
      await page.getByTestId('open-stats').click();
      // // Assert:
      const title = await page.title();
      expect(title).toContain('Statistics');
    });
  });
});
