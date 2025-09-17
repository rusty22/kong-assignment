import { Locator, Page } from "@playwright/test";
import { BasePage } from "./shared/base-page";
import { TableComponent } from "./components/table-component";

export class GatewayServicesPage extends BasePage {
    
  // Page identifiers and main sections
  readonly pageLocator: Locator;
  readonly servicesSection: Locator;
  readonly pageHeader: Locator;
  readonly pageTitle: Locator;
  readonly supportText: Locator;
  readonly learnMoreLink: Locator;

  // Services list section
  readonly servicesListContainer: Locator;
  readonly servicesCard: Locator;
  readonly tableView: Locator;

  readonly gatewayServicesTable: TableComponent;
  readonly addGatewayServiceButton: Locator;

  readonly serviceUrlInput: Locator;
  readonly saveButton: Locator;

  // Service Details
  readonly pathCell: Locator;
  readonly portCell: Locator;
  readonly protocolCell: Locator;
  readonly hostNameCell: Locator;
  readonly tagsCell: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page identifiers and main sections
    this.pageLocator = page.locator('.services.page');
    this.servicesSection = page.locator('section.services-listing');
    this.pageHeader = this.servicesSection.locator('.page-header');
    this.pageTitle = this.pageHeader.locator('.title');
    this.supportText = this.pageHeader.locator('.support-text');
    this.learnMoreLink = this.supportText.locator('.k-external-link');

    // Services list section
    this.servicesListContainer = page.locator('.kong-ui-entities-gateway-services-list');
    this.servicesCard = this.servicesListContainer.locator('.kong-ui-entity-base-table');

    this.gatewayServicesTable = new TableComponent(page);
    this.addGatewayServiceButton = page.getByTestId('toolbar-add-gateway-service');

    this.serviceUrlInput = page.getByTestId('gateway-service-url-input');
    this.saveButton = page.getByTestId('service-create-form-submit');

    // Gateway Service Details
    this.pathCell = page.getByTestId('path-property-value');
    this.portCell = page.getByTestId('port-plain-text');
    this.protocolCell = page.getByTestId('protocol-plain-text');
    this.hostNameCell = page.getByTestId('host-plain-text');
    this.tagsCell = page.getByTestId('tags-property-value');
  }
}
