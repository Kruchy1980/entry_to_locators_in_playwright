import { SESSION_PATH } from '@_pw-config';
import { test, expect } from '@playwright/test';

// To use the session for specific tests we can use it directly with the file with our tests
test.use({ storageState: SESSION_PATH });
test.describe('Trying', () => {
  test('Switch to users page', async ({ page }) => {
    // Arrange:
    // Act:
    await expect(page.getByTestId('hello')).toBeVisible();
    // await page.getByTestId('open-users').click();
    // // Assert:
    // expect(page.title()).toContain(/users.*/);
  });
});
