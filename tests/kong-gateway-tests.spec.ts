import { test, expect } from '@playwright/test';
import { WorkspacesPage } from '../pages/workspaces-page';
import { WorkspaceOverviewPage } from '../pages/workspaces-overview-page';

test.describe('Kong Take Home Assignment', () => {
  let workspacesPage: WorkspacesPage;
  let workspacesOverviewPage: WorkspaceOverviewPage;

  test.describe('Kong Gateway Tests', () => {

    test.beforeEach(async ({ page }) => {
      workspacesPage = new WorkspacesPage(page);
      workspacesOverviewPage = new WorkspaceOverviewPage(page);
      await page.goto('/');
      await workspacesPage.waitForPageLoad();
    });

    test('Smoke Test', async () => {
      await test.step('Title and brand logo are visible', async () => {
        expect(await workspacesPage.page.title()).toContain('Kong Manager');
        expect(workspacesPage.kongManagerLogo).toBeVisible();
      })

      await test.step('Workspaces title, summary metrics card, workspaces card and kong call to action are visible upon load', async () => {
        await expect(workspacesPage.title).toHaveText('Workspaces');
        await expect(workspacesPage.summaryCard).toBeVisible();
        await expect(workspacesPage.workspaceListCard).toBeVisible();
        await expect(workspacesPage.callToActionComponent.konnectCtaCard).toBeVisible();
      })
    });

    test('Gateway Service Creation - User Journey', async () => {
      await test.step('Given I am an administrator on the Kong Manager UI', async () => {
        await test.step('Then I should be able to view the gateway metrics card with 0 counts', async () => {
          const metrics = await workspacesPage.getAllMetricValues();
          expect(metrics.services).toBe(0);
          expect(metrics.routes).toBe(0);
          expect(metrics.consumers).toBe(0);
          expect(metrics.plugins).toBe(0);
          expect(metrics.apiRequests).toBe('--');
        });

        await test.step('When I go to the default workspace', async () => {
          await workspacesPage.defaultWorkspaceLink.click();
          // Wait for navigation
          await workspacesPage.page.waitForLoadState('networkidle');
        });

        await test.step('Then I should be able to view the default workspace overview page', async () => {
          await expect(workspacesOverviewPage.title).toHaveText('Overview');
          await expect(workspacesOverviewPage.summaryOverviewCard).toBeVisible();
          await expect(workspacesOverviewPage.onboardingServiceCard).toBeVisible();
          await expect(workspacesOverviewPage.resourcesCard).toBeVisible();
          await expect(workspacesOverviewPage.callToActionComponent.konnectCtaCard).toBeVisible();
        });
      });
    });
  });
});
