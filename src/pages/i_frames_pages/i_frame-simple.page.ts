import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class IFrameSimplePage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/practice/iframe-0.html';
  }
}
