// This file contains test for logging in user ans saving the session
import { SESSION_PATH } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { expect, test } from '@playwright/test';

test.describe('Session', () => {
  test('Authenticate', async ({ page }) => {
    // Arrange:
    const loginPage = new LoginPage(page);
    // Act:
    await loginPage.navigateTo();
    await loginPage.loginValidUser();

    // Small assertion not really needed in this file
    await expect(page.getByTestId('hello')).toBeVisible();
    await page.getByText('Toggle darkmode:').click();
    // await page.getByText('Toggle darkmode:').click();
    // Save the session in proper file - path per specific user can be used in here
    await page.context().storageState({ path: SESSION_PATH });
  });
});
