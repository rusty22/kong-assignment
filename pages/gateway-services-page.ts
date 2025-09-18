import { Locator, Page } from "@playwright/test";
import { BasePage } from "./shared/base-page";
import { TableComponent } from "./components/table-component";

export class GatewayServicesPage extends BasePage {
    
  // Services list section
  readonly servicesSection: Locator;
  readonly servicesListContainer: Locator;
  readonly servicesCard: Locator;
  readonly tableView: Locator;

  readonly gatewayServicesTable: TableComponent;
  readonly addGatewayServiceButton: Locator;

  readonly serviceUrlInput: Locator;
  readonly serviceNameInput: Locator;
  readonly saveButton: Locator;
  readonly supportText: Locator;

  readonly serviceIdCell: Locator;
  readonly serviceNameCell: Locator;
  readonly enabledStatusCell: Locator;
  readonly lastUpdatedDateCell: Locator;
  readonly createdDateCell: Locator;
  
  // Service Details
  readonly pathCell: Locator;
  readonly portCell: Locator;
  readonly protocolCell: Locator;
  readonly hostNameCell: Locator;
  readonly tagsCell: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page identifiers and main sections
    this.servicesSection = page.locator('section.services-listing');
    this.supportText = page.locator('.support-text');

    // Services list section
    this.servicesListContainer = page.locator('.kong-ui-entities-gateway-services-list');
    this.servicesCard = this.servicesListContainer.locator('.kong-ui-entity-base-table');

    this.gatewayServicesTable = new TableComponent(page);
    this.addGatewayServiceButton = page.getByTestId('toolbar-add-gateway-service');
    this.serviceUrlInput = page.getByTestId('gateway-service-url-input');
    this.serviceNameInput = page.getByTestId('gateway-service-name-input');
    this.saveButton = page.getByTestId('service-create-form-submit');

    // Gateway Service Details
    this.serviceIdCell = page.getByTestId('id-property-value');
    this.serviceNameCell = page.getByTestId('name-plain-text');
    this.enabledStatusCell = page.getByTestId('enabled-badge-status');
    this.lastUpdatedDateCell = page.getByTestId('updated_at-date');
    this.createdDateCell = page.getByTestId('created_at-date');
    this.pathCell = page.getByTestId('path-property-value');
    this.portCell = page.getByTestId('port-plain-text');
    this.protocolCell = page.getByTestId('protocol-plain-text');
    this.hostNameCell = page.getByTestId('host-plain-text');
    this.tagsCell = page.getByTestId('tags-property-value');

    // Advanced section locators (future improvement)
  }

  // Navigation and page loading
  async navigate(serviceName: string = 'default'): Promise<void> {
    await this.page.goto(`/${serviceName}/services`);
    await this.waitForPageLoad();
  }

}
