import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class SimpleMultipleElementsPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/simple-multiple-elements-no-ids.html';
  }
}
