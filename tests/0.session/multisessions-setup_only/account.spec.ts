import { USER_EMAIL, USER_EMAIL_VIEWER } from '@_config/env.config';
// import { CREATOR_SESSION_PATH, VIEWER_SESSION_PATH } from '@_pw-config';
import { test, expect } from '@playwright/test';

test.describe('Account verification', () => {
  // SOLUTION I Session used directly in test set
  // test.use({ storageState: CREATOR_SESSION_PATH });
  // SOLUTION II SESSIONS added in the Projects - go to playwright.config.ts is good to use tags for projects identification
  test('Account - creator', { tag: ['@creator'] }, async ({ page }) => {
    // Arrange:
    const expectedHelloMessage = `Hi ${USER_EMAIL}!`;

    // Act:
    await page.goto('/welcome/');

    // Assert:
    await expect(page.getByTestId('hello')).toBeVisible();
    // Verification whether proper user is logged in dependent of session
    await expect(page.getByTestId('hello')).toHaveText(expectedHelloMessage);
  });
});
test.describe('Account verification', () => {
  // SOLUTION I Session used directly in test set
  // test.use({ storageState: VIEWER_SESSION_PATH });
  // SOLUTION II SESSIONS added in the Projects - go to playwright.config.ts  is good to use tags for projects identification
  test('Account - viewer', { tag: ['@viewer'] }, async ({ page }) => {
    // Arrange:
    const expectedHelloMessage = `Hi ${USER_EMAIL_VIEWER}!`;

    // Act:
    await page.goto('/welcome/');

    // Assert:
    await expect(page.getByTestId('hello')).toBeVisible();
    // Verification whether proper user is logged in dependent of session
    await expect(page.getByTestId('hello')).toHaveText(expectedHelloMessage);
  });
});
