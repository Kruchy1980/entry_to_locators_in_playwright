import { Locator, Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';
// import { USER_EMAIL, USER_PASSWORD } from '@_config/env.config';

export class LoginPage extends PracticePage {
  url: string;
  userEmail: Locator;
  userPassword: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/login/';
    this.userEmail = page.locator('[name="username"]');
    this.userPassword = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
  }

  async loginValidUser(user: string, password: string): Promise<void> {
    await this.userEmail.fill(user);
    await this.userPassword.fill(password);
    await this.loginButton.click();
  }
}
