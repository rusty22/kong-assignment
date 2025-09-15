
import { expect, type Locator, type Page } from '@playwright/test';

export class KongLandingPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1', { hasText: 'Installation' });
  }

  async goto() {
    await this.page.goto('http://localhost:8002/');
  }
}