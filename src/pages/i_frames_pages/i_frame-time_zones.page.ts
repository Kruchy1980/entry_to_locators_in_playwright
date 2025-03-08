import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class IFrameTimeZonePage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/practice/iframe-1.html';
  }
}
