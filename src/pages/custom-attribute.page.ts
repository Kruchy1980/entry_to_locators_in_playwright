import { Page } from '@playwright/test';
import { PracticePage } from './practice.page';

export class CustomAttributesPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/simple-elements-custom-attribute.html';
  }
}
