import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class ShadowSimplePage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/practice/shadow-dom-0.html';
  }
}
