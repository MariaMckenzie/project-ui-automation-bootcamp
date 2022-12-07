const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
        baseUrl: "https://www.saucedemo.com",
        specPattern: 'cypress/e2e/tests/**/*.cy.{js,jsx,ts,tsx}',
        experimentalSessionAndOrigin: true,
        chromeWebSecurity: false,
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'cypress/reports',
            overwrite: false,
            html: false,
            json: true
        }
    },
});
