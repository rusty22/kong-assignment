# kong-assignment
![CI](https://github.com/rusty22/kong-assignment/actions/workflows/playwright.yml/badge.svg)

Kong Take Home Assignment by Glendon Ngo.

# Toolchain
- Playwright Framework (Typescript)

# Local setup
```
npm install
```

# Running tests

In the top-level folder, run some of the following commands to run the tests:

Run all the end-to-end tests in headless mode.
```
  npx playwright test
```

Run all the end-to-end tests in headed mode.
```
  npx playwright test --headed
```

Run only the smoke tests:
```
  npx playwright test --grep @smoke
```

Run only the user journey tests:
```
   npx playwright test --grep @user-journey
```

Run the tests only on chrome
``` 
  npx playwright test --project=chromium
```

Runs the tests in debug mode.
```  
  npx playwright test --debug
```

Open the Playwright UI Interactive Test Runner:
```
  npx playwright test --ui
```

# Reporting
View the HTML report after tests run (always opens after running by default):
```
 npx playwright show-report
```

# Design Considerations

I used the **page object model** pattern and component based architecture to model locators within the Workspace summary, Workspace overview, Gateway services, and routes pages. This helped to ensure reusable locators across several pages in the Kong Manager UI. For example, I created a base page which contain elements that always appear throughout the UI. These include the header and sidebar as component classes so they could be easily referenced within the base page. I also modelled table-like components such as the workspace, services, and routes list so it would reduce the amount of duplicate locators required to model these pages individually.

# Best Practices
- CI/CD is in Github Actions and the E2E tests run on every change to main branch.
- Runs tests on both chromium and firefox browsers
- After the user journey test finishes, the test will attempt to delete the route and the related gateway service from the UI. This ensures that the test can be ran and pass multiple times without having to setup the UI at a known state.
- For most locators, I used `data-testid` attributes where elements were decorated with them.
- I ensured tests can be ran independently of each other.
- Sharing pages and locators where identified, made component classes for things that could be shared across pages (eg. see TableComponent)
- Use BDD (Behaviour driven development) language to describe tests
- HTML reporting after the test run finishes.

# Assumptions
Some of the assumptions while doing this assignment were:

- The tests assume it is beginning from an empty state with zero gateway services or routes created prior.
  - I would improve this by adding a beforeAll function to clear out the database so there can be a reliable setup state.
- I would continue to map locators and write additional checks for specifying advanced details for gateway services (retries, connect time, write/read timeout, certificates etc) and routes (Https redirect status code, Regex Priority, Strip path etc.)
- If I had more time, I'd continue to generalize the empty state for pages in the sidebar. For example, the Consumers, Plugins, Redis, Upstreams, Certificates, SNIs subpages all have a very similar look in empty state.

# Additional checks

These are some additional checks I would do if I had more time:
- Check that you cannot delete a gateway service without deleting its route first

# Improvements
- Parallel execution
- Better setup and teardown checks
- Incorporate Web Security Testing (OWASP) - eg. SQL injection
- Incorporate Fuzz testing (give strange/bad inputs!)

Thank you!