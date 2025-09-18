import { test, expect } from '@playwright/test';
import { WorkspacesPage } from '../pages/workspaces-page';

test.describe('Kong Gateway Smoke Tests', () => {
    let workspacesPage: WorkspacesPage;

    test.beforeEach(async ({ page }) => {
        workspacesPage = new WorkspacesPage(page);
        await workspacesPage.navigate();
    });

    test('Smoke Test - Upon load', { tag: '@Smoke' }, async () => {
        await test.step('Check kong header components are visible', async () => {
        expect(await workspacesPage.page.title()).toContain('Kong Manager');
        expect(workspacesPage.kongHeader.brandLogo).toBeVisible();
        expect(workspacesPage.kongHeader.docsDropdown).toBeVisible();
        expect(workspacesPage.kongHeader.infoLink).toBeVisible();
        expect(workspacesPage.kongHeader.githubStars).toBeVisible();
        })

        await test.step('Check kong main sidebar components are visible', async () => {
        expect(workspacesPage.kongSideNavBar.workspacesItem).toBeVisible();
        expect(workspacesPage.kongSideNavBar.teamsItem).toBeVisible();
        expect(workspacesPage.kongSideNavBar.devPortalItem).toBeVisible();
        expect(workspacesPage.kongSideNavBar.analyticsItem).toBeVisible();
        })

        await test.step('Check the workspaces title, summary metrics card, workspaces card and kong call to action are visible', async () => {
        await expect(workspacesPage.title).toHaveText('Workspaces');
        await expect(workspacesPage.summaryCard).toBeVisible();
        await expect(workspacesPage.workspaceListCard).toBeVisible();
        await expect(workspacesPage.callToActionComponent.konnectCtaCard).toBeVisible();
        })
    });
});
