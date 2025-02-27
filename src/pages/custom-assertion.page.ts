import { Page } from '@playwright/test';
import { PracticePage } from './practice.page';

export class CustomAssertionsPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/ADD LINK';
  }
}
