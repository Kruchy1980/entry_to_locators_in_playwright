import { Page } from '@playwright/test';
import { PracticePage } from './practice.page';

export class SimpleElementsPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/simple-elements.html/';
  }
}
