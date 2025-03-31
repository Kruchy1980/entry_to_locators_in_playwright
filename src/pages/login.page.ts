import { Locator, Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';
import { USER_EMAIL, USER_PASSWORD } from '@_config/env.config';

export class LoginPage extends PracticePage {
  url: string;
  userEmail: Locator;
  userPassword: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/login/';
    this.userEmail = page.getByPlaceholder('Enter User Email');
    this.userPassword = page.getByPlaceholder('Enter Password');
    this.loginButton = page.getByRole('button', { name: 'LogIn' });
  }

  // async loginValidUser(email: string, password: string): Promise<void> {
  //   await this.userEmail.fill(email);
  //   await this.userPassword.fill(password);
  //   await this.loginButton.click();
  // }
  async loginValidUser(): Promise<void> {
    await this.userEmail.fill(USER_EMAIL);
    await this.userPassword.fill(USER_PASSWORD);
    await this.loginButton.click();
  }
}
