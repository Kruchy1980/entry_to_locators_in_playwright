import { Page } from '@playwright/test';
import { PracticePage } from './practice.page';

export class DelayedElementsV2Page extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/delayed-elements-and-delayed-result-2.html';
  }
}
