import { Page, Locator } from '@playwright/test';
import { BasePage } from './shared/base-page';

interface MetricValues {
  services: Number | null;
  routes: Number | null;
  consumers: Number | null;
  plugins: Number | null;
  apiRequests: string | null;
}

interface WorkspaceRowData {
  name: string | null;
  gatewayServices: string | null;
  consumers: string | null;
  routes: string | null;
}

interface NavigationButtonsState {
  previous: boolean;
  next: boolean;
}

export class WorkspacesPage extends BasePage {
  
  // Page identifiers and main sections
  readonly pageLocator: Locator;
  readonly mainContent: Locator;

  // License notification
  readonly licenseNotification: Locator;
  readonly licenseNotificationMessage: Locator;


  // Summary card metrics
  readonly summaryCard: Locator;
  readonly summaryCardTitle: Locator;
  readonly metricsSection: Locator;
  
  readonly servicesMetric: Locator;
  readonly servicesCount: Locator;
  readonly servicesInfoIcon: Locator;
  
  readonly routesMetric: Locator;
  readonly routesCount: Locator;
  readonly routesInfoIcon: Locator;
  
  readonly consumersMetric: Locator;
  readonly consumersCount: Locator;
  readonly consumersInfoIcon: Locator;
  
  readonly pluginsMetric: Locator;
  readonly pluginsCount: Locator;
  readonly pluginsInfoIcon: Locator;
  
  readonly apiRequestsMetric: Locator;
  readonly apiRequestsCount: Locator;
  readonly apiRequestsInfoIcon: Locator;

  // Workspaces list section
  readonly workspaceListCard: Locator;
  readonly workspaceFilter: Locator;
  readonly workspaceTable: Locator;
  readonly workspaceTableHeaders: Locator;
  
  readonly workspaceNameHeader: Locator;
  readonly gatewayServicesHeader: Locator;
  readonly consumersHeader: Locator;
  readonly routesHeader: Locator;
  
  readonly workspaceRows: Locator;
  readonly defaultWorkspaceLink: Locator;
  readonly defaultWorkspaceIcon: Locator;
  readonly defaultWorkspaceName: Locator;

  // Table pagination
  readonly pagination: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly pageSizeDropdown: Locator;
  readonly pageSizeDropdownTrigger: Locator;

  // Konnect CTA section
  readonly konnectCtaCard: Locator;
  readonly konnectLogo: Locator;
  readonly konnectTitle: Locator;
  readonly konnectDescription: Locator;
  readonly konnectFeaturesList: Locator;
  readonly konnectFeatureItems: Locator;
  readonly konnectGetStartedButton: Locator;
  readonly konnectPreviewImage: Locator;
  readonly konnectFooterDescription: Locator;

  constructor(page: Page) {
    super(page)
    
    // Page identifiers and main sections
    this.pageLocator = page.locator('.workspace-overview.page');
    this.mainContent = page.locator('.main-content');

    // License notification
    this.licenseNotification = page.locator('.invalid-license-notification');
    this.licenseNotificationMessage = this.licenseNotification.locator('.alert-message');


    // Summary card metrics
    this.summaryCard = page.locator('.workspace-overview-summary');
    this.summaryCardTitle = this.summaryCard.locator('.card-title');
    this.metricsSection = this.summaryCard.locator('.summary-view-metrics');
    
    this.servicesMetric = page.getByTestId('Services');
    this.servicesCount = this.servicesMetric.locator('.metric-value-text');
    this.servicesInfoIcon = this.servicesMetric.locator('.kui-icon.info-icon');
    
    this.routesMetric = page.getByTestId('Routes');
    this.routesCount = this.routesMetric.locator('.metric-value-text');
    this.routesInfoIcon = this.routesMetric.locator('.kui-icon.info-icon');
    
    this.consumersMetric = page.getByTestId('Consumers');
    this.consumersCount = this.consumersMetric.locator('.metric-value-text');
    this.consumersInfoIcon = this.consumersMetric.locator('.kui-icon.info-icon');
    
    this.pluginsMetric = page.getByTestId('Plugins');
    this.pluginsCount = this.pluginsMetric.locator('.metric-value-text');
    this.pluginsInfoIcon = this.pluginsMetric.locator('.kui-icon.info-icon');
    
    this.apiRequestsMetric = page.getByTestId('API Requests');
    this.apiRequestsCount = this.apiRequestsMetric.locator('.metric-value-text');
    this.apiRequestsInfoIcon = this.apiRequestsMetric.locator('.kui-icon.info-icon');

    // Workspaces list section
    this.workspaceListCard = page.locator('.workspace-list');
    this.workspaceFilter = page.locator('.workspace-filter input');
    this.workspaceTable = page.locator('.k-table-view');
    this.workspaceTableHeaders = this.workspaceTable.locator('th.table-headers');
    
    this.workspaceNameHeader = page.getByTestId('table-header-name');
    this.gatewayServicesHeader = page.getByTestId('table-header-totalServices');
    this.consumersHeader = page.getByTestId('table-header-totalConsumers');
    this.routesHeader = page.getByTestId('table-header-totalRoutes');
    
    this.workspaceRows = this.workspaceTable.locator('tbody tr');
    this.defaultWorkspaceLink = page.getByTestId('workspace-link-default');
    this.defaultWorkspaceIcon = this.defaultWorkspaceLink.locator('.workspace-icon');
    this.defaultWorkspaceName = this.defaultWorkspaceLink.locator('.workspace-name');

    // Table pagination
    this.pagination = page.locator('.table-pagination');
    this.previousButton = page.getByTestId('previous-button');
    this.nextButton = page.getByTestId('next-button');
    this.pageSizeDropdown = page.getByTestId('page-size-dropdown');
    this.pageSizeDropdownTrigger = page.getByTestId('page-size-dropdown-trigger');

    // Konnect CTA section
    this.konnectCtaCard = page.locator('.konnect-cta-container');
    this.konnectLogo = this.konnectCtaCard.locator('.konnect-logo');
    this.konnectTitle = this.konnectCtaCard.locator('.konnect-cta-title');
    this.konnectDescription = this.konnectCtaCard.locator('.konnect-cta-description');
    this.konnectFeaturesList = this.konnectCtaCard.locator('.konnect-cta-list');
    this.konnectFeatureItems = this.konnectFeaturesList.locator('.konnect-cta-item');
    this.konnectGetStartedButton = this.konnectCtaCard.locator('.konnect-cta-footer .k-button');
    this.konnectPreviewImage = this.konnectCtaCard.locator('.konnect-preview');
    this.konnectFooterDescription = this.konnectCtaCard.locator('.konnect-cta-footer-description');
  }

  // Utility methods
  async waitForPageLoad(): Promise<void> {
    await this.pageLocator.waitFor({ state: 'visible' });
    await this.summaryCard.waitFor({ state: 'visible' });
    await this.workspaceListCard.waitFor({ state: 'visible' });
  }

  async getMetricValue(metricName: string): Promise<string | null> {
    const metricLocator = this.page.getByTestId(metricName).locator('.metric-value-text');
    return await metricLocator.textContent();
  }

  async getAllMetricValues(): Promise<MetricValues> {
    return {
      services: Number(await this.getMetricValue('Services')),
      routes: Number(await this.getMetricValue('Routes')),
      consumers: Number(await this.getMetricValue('Consumers')),
      plugins: Number(await this.getMetricValue('Plugins')),
      apiRequests: await this.getMetricValue('API Requests')
    };
  }

  async getWorkspaceRowData(rowIndex: number = 0): Promise<WorkspaceRowData> {
    const row = this.workspaceRows.nth(rowIndex);
    const cells = row.locator('td');
    
    return {
      name: await cells.nth(0).textContent(),
      gatewayServices: await cells.nth(1).textContent(),
      consumers: await cells.nth(2).textContent(),
      routes: await cells.nth(3).textContent()
    };
  }

  async areNavigationButtonsDisabled(): Promise<NavigationButtonsState> {
    const prevDisabled = await this.previousButton.isDisabled();
    const nextDisabled = await this.nextButton.isDisabled();
    return { previous: prevDisabled, next: nextDisabled };
  }
}