import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class NotPresentElementsPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/not-present-elements-1.html';
  }
}
