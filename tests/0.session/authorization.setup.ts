// This file contains test for logging in user ans saving the session
import { SESSION_PATH } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { expect, test as setup } from '@playwright/test';

setup('Setup session - authenticate', async ({ page }) => {
  // Arrange:
  const loginPage = new LoginPage(page);
  // Act:
  await loginPage.navigateTo();
  await loginPage.loginValidUser();
  // Small assertion not really needed in this file
  await expect(page.getByTestId('hello')).toBeVisible();
  // Save the session in proper file - path per specific user can be used in here
  await page.context().storageState({ path: SESSION_PATH });
});
