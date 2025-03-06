import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class ShadowPOIPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/practice/shadow-dom-2.html';
  }
}
