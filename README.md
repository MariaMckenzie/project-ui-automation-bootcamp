# Project UI Automation Bootcamp
Cypress project for QualityWorks UI Automation Bootcamp

### Dependencies
1. NodeJS v12, v14 or above
3. NPM v6 or above
3. Chrome, Edge, Firefox browser

### Getting Started
Clone the repository & install dependencies
```sh
$ git clone 
$ cd cypress-ui-automation-bootcamp
$ npm install
```
# Folder Structure
- **cypress/e2e/pages:** Page object files which include element selectors and functions that are used in tests.
- **cypress/e2e/tests:** Test files which include the actual tests.
- **cypress/e2e/data:** Data files used in data-driven tests.

# Execute tests
Execute the Cypress GUI

```npm run cypress:open```

Execute the Cypress via commandline

```npm run cypress:run```

Executes all tests in the Edge browser and generates a Mochawesome report.

```npm test``` 

# Execute tests in a different browser
```npx cypress run --browser firefox```

***N.B. The browser must be installed on the device.***

# Execute a specific test file

Without Report

```npx cypress run --spec cypress/e2e/tests/authentication/auth.cy.js```

OR

With Report

```npm run test:spec cypress/e2e/tests/authentication/auth.cy.js```

***N.B. Most test will run headless but for all tests to pass its best to run ```npm run cypress:open``` and run them there. Also, some tests may have to be ran more than once because cypress sometimes does not open the element or make it visible.***
 