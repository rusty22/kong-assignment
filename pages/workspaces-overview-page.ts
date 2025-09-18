import { Page, Locator } from '@playwright/test';
import { BasePage } from './shared/base-page';
import { KongCallToActionComponent } from './components/call-to-action-component';

interface WorkspaceOverviewMetricValues {
  services: number | null;
  routes: number | null;
  consumers: number | null;
  plugins: number | null;
}

interface ResourceLink {
  title: string | null;
  description: string | null;
  href: string | null;
}

export class WorkspaceOverviewPage extends BasePage {
  
  readonly overviewSection: Locator;

  // Summary card metrics
  readonly summaryOverviewCard: Locator;
  readonly summaryOverviewCardTitle: Locator;
  readonly summaryOverviewMetrics: Locator;
  
  readonly servicesMetric: Locator;
  readonly servicesCount: Locator;
  readonly servicesInfoIcon: Locator;
  
  readonly routesMetric: Locator;
  readonly routesCount: Locator;
  readonly routesInfoIcon: Locator;
  
  // Onboarding cards
  readonly cardGroup: Locator;
  readonly pluginOnboardingCard: Locator;
  
  // Onboarding Card elements
  readonly onboardingServiceCard: Locator;
  readonly addGatewayServiceButton: Locator;
  readonly onboardingTitle: Locator;
  readonly onboardingViewDocsButton: Locator;
  readonly onboardingAddGatewayServiceButton: Locator;
  readonly onboardingText: Locator;

  // Resources section
  readonly resourcesCard: Locator;
  readonly resourcesTitle: Locator;
  readonly resourcesList: Locator;
  readonly resourceItems: Locator;

  // Individual resource links
  readonly introductionLink: Locator;
  readonly getStartedLink: Locator;
  readonly pluginHubLink: Locator;
  readonly kongNationLink: Locator;

  readonly callToActionComponent: KongCallToActionComponent;

  constructor(page: Page) {
    super(page);
    
    // Page identifiers and main sections
    this.overviewSection = page.locator('section.overview');

    // Summary card metrics
    this.summaryOverviewCard = page.getByTestId('overview-card');
    this.summaryOverviewCardTitle = this.summaryOverviewCard.locator('.card-title');
    this.summaryOverviewMetrics = this.summaryOverviewCard.locator('.summary-view-metrics');
    
    this.servicesMetric = page.getByTestId('Services');
    this.servicesCount = this.servicesMetric.locator('.metric-value-text');
    this.servicesInfoIcon = this.servicesMetric.locator('.kui-icon.info-icon');
    
    this.routesMetric = page.getByTestId('Routes');
    this.routesCount = this.routesMetric.locator('.metric-value-text');
    this.routesInfoIcon = this.routesMetric.locator('.kui-icon.info-icon');

    // Onboarding cards
    this.cardGroup = page.locator('.card-group');
    this.onboardingServiceCard = page.getByTestId('onboarding-service-card');
    
    // Plugin card elements
    this.onboardingTitle = this.onboardingServiceCard.locator('.card-title .title span');
    this.onboardingViewDocsButton = this.onboardingServiceCard.getByText('View docs');
    this.onboardingAddGatewayServiceButton = this.onboardingServiceCard.getByTestId('action-button');
    this.onboardingText = this.onboardingServiceCard.locator('.content-text');
    
    // Resources section
    this.resourcesCard = page.locator('.resource-list');
    this.resourcesTitle = this.resourcesCard.locator('.card-title');

    // Individual resource links
    this.introductionLink = this.resourcesCard.getByRole('link', { name: 'Introduction' });
    this.getStartedLink = this.resourcesCard.getByRole('link', { name: 'Get Started' });
    this.pluginHubLink = this.resourcesCard.getByRole('link', { name: 'Plugin Hub' });
    this.kongNationLink = this.resourcesCard.getByRole('link', { name: 'Kong Nation' });

    // Kong Konnect - Call to Action component
    this.callToActionComponent = new KongCallToActionComponent(page);
  }

  // Navigation and page loading
  async navigate(workspaceName: string = 'default'): Promise<void> {
    await this.page.goto(`/${workspaceName}/overview`);
    await this.waitForPageLoad();
  }

  // Metric helper methods
  async getMetricValue(metricName: string): Promise<number | null> {
    const metricLocator = this.page.getByTestId(metricName).locator('.metric-value-text');
    const textContent = await metricLocator.textContent();
    return textContent ? parseInt(textContent.trim(), 10) : null;
  }

  async getAllMetricValues(): Promise<WorkspaceOverviewMetricValues> {
    return {
      services: await this.getMetricValue('Services'),
      routes: await this.getMetricValue('Routes'),
      consumers: await this.getMetricValue('Consumers'),
      plugins: await this.getMetricValue('Plugins')
    };
  }

  async clickMetricInfoIcon(metricName: string): Promise<void> {
    const infoIcon = this.page.getByTestId(metricName).locator('.kui-icon.info-icon');
    await infoIcon.click();
  }

  // Resources section methods
  async getResourceLinks(): Promise<ResourceLink[]> {
    const resources: ResourceLink[] = [];
    const items = await this.resourceItems.all();
    
    for (const item of items) {
      const link = item.locator('a');
      const title = await item.locator('.resource-title').textContent();
      const description = await item.locator('.resource-description').textContent();
      const href = await link.getAttribute('href');
      
      resources.push({ title, description, href });
    }
    
    return resources;
  }
}