import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class IFramePOIPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/practice/iframe-2.html';
  }
}
