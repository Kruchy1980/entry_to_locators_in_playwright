// import { USER_EMAIL, USER_PASSWORD } from '@_config/env.config';
import {
  USER_EMAIL,
  USER_EMAIL_VIEWER,
  USER_PASSWORD,
  USER_PASSWORD_VIEWER,
} from '@_config/env.config';
import { CREATOR_SESSION_PATH, VIEWER_SESSION_PATH } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { test } from '@playwright/test';

test.describe('Setup session', () => {
  let loginPage: LoginPage;
  test.beforeAll(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('authenticate as creator', { tag: ['@creator'] }, async ({ page }) => {
    // Arrange:
    const userName = USER_EMAIL;
    const userPassword = USER_PASSWORD;

    // Act:
    await loginPage.navigateTo();
    await loginPage.loginValidUser(userName, userPassword);

    // Assert:
    await page.context().storageState({ path: CREATOR_SESSION_PATH });
  });
  test('authenticate as viewer', { tag: ['@viewer'] }, async ({ page }) => {
    // Arrange:
    const userName = USER_EMAIL_VIEWER;
    const userPassword = USER_PASSWORD_VIEWER;

    // Act:
    await loginPage.navigateTo();
    await loginPage.loginValidUser(userName, userPassword);
    await page.getByText('Toggle darkmode:').click();

    // Assert:
    await page.context().storageState({ path: VIEWER_SESSION_PATH });
  });
});
