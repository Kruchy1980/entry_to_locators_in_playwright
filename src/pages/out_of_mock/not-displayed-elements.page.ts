import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class NotDisplayedElementsPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/not-displayed-elements-1.html';
  }
}
