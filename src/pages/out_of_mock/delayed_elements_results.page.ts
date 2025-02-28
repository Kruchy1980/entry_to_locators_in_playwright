import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class DelayedElementsPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/delayed-elements-and-delayed-result-1.html';
  }
}
