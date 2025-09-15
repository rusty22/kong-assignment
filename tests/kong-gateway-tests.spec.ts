import { test, expect } from '@playwright/test';
import { WorkspacesPage } from '../pages/workspaces-page';

test.describe('Kong Take Home Assignment', () => {
  let workspacesPage: WorkspacesPage;

  test.describe('Kong Gateway Tests', () => {
    test.beforeEach(async ({ page }) => {
      workspacesPage = new WorkspacesPage(page);
      await page.goto('/workspaces');
      await workspacesPage.waitForPageLoad();
    });

    test('Smoke Test', async () => {
      test.step('Title and brand logo are visible', async () => {
        await expect(await workspacesPage.page.title()).toContain('Kong Manager');
        await expect(workspacesPage.kongManagerLogo).toBeVisible();
      })
    });

    test('Gateway Service Creation - User Journey', async () => {
      test.step('Given I am an administrator on the Kong Manager UI', () => {
      });

      test.step('When I create a new gateway service', () => {
        test.step('Then I should be able to view the gateway metrics', async () => {
          const metrics = await workspacesPage.getAllMetricValues();
          expect(metrics.services).toBe(0);
          expect(metrics.routes).toBe(0);
          expect(metrics.consumers).toBe(0);
          expect(metrics.plugins).toBe(0);
          expect(metrics.apiRequests).toBe('--');
        });
      });
    });
  });
});
