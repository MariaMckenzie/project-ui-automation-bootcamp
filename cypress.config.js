const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
        baseUrl: "https://ui-automation-camp.vercel.app",
        specPattern: 'cypress/e2e/tests/**/*.cy.{js,jsx,ts,tsx}',
        chromeWebSecurity: false,
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'cypress/reports',
            overwrite: false,
            html: false,
            json: true
        },

        defaultCommandTimeout: 30000,
        responseTimeout: 30000,
        requestTimeout: 30000,
        
        env: {
            CYPRESS_MAILSLURP_API_KEY: '9fcabbf7701d5e08fe4dcb65559a44ab360bbd5d70fcb6ab77b69f9626db41ca',
        },
    },      
});
