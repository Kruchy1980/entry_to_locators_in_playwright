// This file contains test for logging in user ans saving the session
import { SESSION_PATH_SETUP } from '@_pw-config';
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
  // Just for try to use it to configure dark mode for the session
  await page.getByText('Toggle darkmode:').click();
  // Save the session in proper file - path per specific user can be used in here
  await page.context().storageState({ path: SESSION_PATH_SETUP });
});
