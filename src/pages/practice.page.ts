import { Page } from '@playwright/test';

export class PracticePage {
  url: string;
  constructor(protected page: Page) {
    this.url = '/practice/';
  }

  async navigateTo(parameters?: string): Promise<void> {
    await this.page.goto(`${this.url}${parameters ? parameters : ''}`);
  }
}
