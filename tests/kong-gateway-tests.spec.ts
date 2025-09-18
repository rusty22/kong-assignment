import { test, expect } from '@playwright/test';
import { WorkspacesPage } from '../pages/workspaces-page';
import { WorkspaceOverviewPage } from '../pages/workspaces-overview-page';
import { GatewayServicesPage } from '../pages/gateway-services-page';

test.describe('Kong Take Home Assignment', () => {
  let workspacesPage: WorkspacesPage;
  let workspacesOverviewPage: WorkspaceOverviewPage;
  let gatewayServicesPage: GatewayServicesPage;

  test.describe('Kong Gateway Tests', () => {

    test.beforeEach(async ({ page }) => {
      workspacesPage = new WorkspacesPage(page);
      workspacesOverviewPage = new WorkspaceOverviewPage(page);
      gatewayServicesPage = new GatewayServicesPage(page);
      await workspacesPage.navigate();
    });

    test('Smoke Test - Upon load', async () => {
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

    test('Gateway Service Creation - User Journey', async () => {
      await test.step('Given I am an administrator on the Kong Manager UI', async () => {

        await test.step('When I am on the workspaces page', async () => {
          await expect(workspacesPage.title).toHaveText('Workspaces');

          await test.step('Then I should be able to view the gateway metrics with 0 counts pf services, routes, consumers, plugins, and api requests', async () => {
            const metrics = await workspacesPage.getAllMetricValues();
            expect(metrics.services).toBe(0);
            expect(metrics.routes).toBe(0);
            expect(metrics.consumers).toBe(0);
            expect(metrics.plugins).toBe(0);
            expect(metrics.apiRequests).toBe('--');
          });
          
          await test.step('And I should be able to view workspace metrics with 0 services, consumers, and routes', async () => {
            const workspaceMetrics = await workspacesPage.getWorkspaceRowData(0);
            expect(workspaceMetrics.name).toContain('default')
            expect(workspaceMetrics.consumers).toBe(0)
            expect(workspaceMetrics.gatewayServices).toBe(0);
            expect(workspaceMetrics.routes).toBe(0);
          });

          await test.step('And I should be able to view the kong konnect call to action component', async () => {
            expect(workspacesPage.callToActionComponent.konnectCtaCard).toBeVisible();
            expect(workspacesPage.callToActionComponent.konnectDescription).toBeVisible();
            expect(workspacesPage.callToActionComponent.konnectFeaturesList).toBeVisible();
            expect(workspacesPage.callToActionComponent.konnectGetStartedButton).toBeVisible();
            expect(workspacesPage.callToActionComponent.konnectPreviewScreenshot).toBeVisible();
            expect(workspacesPage.callToActionComponent.konnectFooterDescription).toBeVisible();
          });
        });

        await test.step('When I go to the default workspace', async () => {
          await workspacesPage.defaultWorkspaceLink.click();

          await test.step('Then I should be able to view the default workspace overview page', async () => {
            await expect(workspacesOverviewPage.title).toHaveText('Overview');
            await expect(workspacesOverviewPage.summaryOverviewCard).toBeVisible();
            await expect(workspacesOverviewPage.onboardingServiceCard).toBeVisible();
            await expect(workspacesOverviewPage.resourcesCard).toBeVisible();
            await expect(workspacesOverviewPage.callToActionComponent.konnectCtaCard).toBeVisible();
          });

          await test.step('And I should be able to view workspace overview metrics with 0 services, routes, consumers, and plugins', async () => {
            const workspaceOverviewMetrics = await workspacesOverviewPage.getAllMetricValues();
            expect(workspaceOverviewMetrics.services).toBe(0);
            expect(workspaceOverviewMetrics.routes).toBe(0);
            expect(workspaceOverviewMetrics.consumers).toBe(0)
            expect(workspaceOverviewMetrics.plugins).toBe(0);
          });

          await test.step('When I navigate to the gateway services page', async () => {
            await expect(workspacesOverviewPage.kongSideNavBar.gatewayServicesMenuItem).toBeEnabled();
            await workspacesOverviewPage.kongSideNavBar.gatewayServicesMenuItem.click();

            await gatewayServicesPage.waitForPageLoad();

            await test.step('Then I should be on the gateway services page in its empty state with table descriptions', async () => {
              await expect(gatewayServicesPage.title).toHaveText('Gateway Services');
              await expect(gatewayServicesPage.gatewayServicesTable.emptyTableStateIcon).toBeVisible();
              await expect(gatewayServicesPage.gatewayServicesTable.emptyTableStateTitle).toBeVisible();
              await expect(gatewayServicesPage.gatewayServicesTable.emptyTableStateTitle).toHaveText('Configure a New Gateway Service');
              await expect(gatewayServicesPage.gatewayServicesTable.emptyTableStateMessage).toBeVisible();
              await expect(gatewayServicesPage.gatewayServicesTable.emptyTableStateMessage).toHaveText('Gateway services are used to proxy traffic.');
            });
          });

          await test.step('When I go to add a new gateway service', async () => {
            await gatewayServicesPage.gatewayServicesTable.genericEmptyStateActionButton.click();
            await expect(gatewayServicesPage.title).toHaveText('New Gateway Service');

            await test.step('Then I should not be able to save', async () => {
              await expect(gatewayServicesPage.saveButton).toBeDisabled();
            });
            
            await test.step('When I add a name for the gateway service url (required field)', async () => {
              await gatewayServicesPage.serviceUrlInput.fill('https://awesome.service.com');

              await test.step('Then the save button should be enabled', async () => {
                await expect(gatewayServicesPage.saveButton).toBeEnabled();
                await gatewayServicesPage.saveButton.click();
              });

              await test.step('And when I save I should be in the service details page with details about the new service', async () => {
                await expect(gatewayServicesPage.portCell).toHaveText('443')
                await expect(gatewayServicesPage.pathCell).toHaveText(' – ')
                await expect(gatewayServicesPage.hostNameCell).toHaveText('awesome.service.com')
                await expect(gatewayServicesPage.protocolCell).toHaveText('https')
                await expect(gatewayServicesPage.tagsCell).toHaveText(' – ')
              });

              await test.step('And there should be 1 gateway service count in the workspace summary page', async () => {
                await workspacesPage.navigate();
                const metrics = await workspacesPage.getAllMetricValues();
                expect(metrics.services).toBe(1);
                expect(metrics.routes).toBe(0);
                expect(metrics.consumers).toBe(0);
                expect(metrics.plugins).toBe(0);
                expect(metrics.apiRequests).toBe('--');

                await test.step('And there should be 1 gateway services count in the workspaces table', async() => {
                  const workspaceMetrics = await workspacesPage.getWorkspaceRowData(0);
                  expect(workspaceMetrics.gatewayServices).toBe(1);

                  await test.step('And there should still be 0 counts for other entities', async() => {
                    expect(workspaceMetrics.consumers).toBe(0)
                    expect(workspaceMetrics.routes).toBe(0);
                  });
                });
              });

              await test.step('And there should be 1 gateway service count in the default workspace overview page', async () => {
                await workspacesOverviewPage.navigate('default');
                const workspaceOverviewMetrics = await workspacesOverviewPage.getAllMetricValues();
                expect(workspaceOverviewMetrics.services).toBe(1);

                await test.step('And there should still be 0 counts for other entities', async() => {
                  expect(workspaceOverviewMetrics.routes).toBe(0);
                  expect(workspaceOverviewMetrics.consumers).toBe(0)
                  expect(workspaceOverviewMetrics.plugins).toBe(0);
                });
              });
            });

            await test.step('When I create additional route', async () => {
                
            });
          });
        });
      });
    });
  });
});
