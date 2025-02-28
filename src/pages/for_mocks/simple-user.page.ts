import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class SimpleUserPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/random-simple-user-v1.html';
  }
}
