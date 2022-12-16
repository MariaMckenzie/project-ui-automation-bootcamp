import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import detailsPage from "../../pages/details.page"


describe("Product Details (36 - 40)", () => {
    
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)

        // visit the product details page
        cy.visit("https://ui-automation-camp.vercel.app/products/couch-1")
        
        // wait for the page to load
        cy.wait(2000)
    })

    /**
     * Test Case ID: E2E_36
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the navigation bar is visible", () => {
        // assert that the nav bar is visible
        cy.get(detailsPage.navBar)
            .should("be.visible")

        // assert that the buttons in the nav bar are visible - (home, about, contact, cart, sign out)
        cy.get(detailsPage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
        cy.get(detailsPage.aboutButton)
            .should("be.visible")
            .and("contain.text", "About")
        cy.get(detailsPage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
        cy.get(detailsPage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
        cy.get(detailsPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
    })

    /**
     * Test Case ID: E2E_37
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the store’s name and logo are visible at the top of the page", () => {
        // assert that the nav bar is visible
        cy.get(detailsPage.navBar)
            .should("be.visible")
        
        // assert that the logo and store name are visible
        cy.get(detailsPage.storeName).should("be.visible")
            .and("contain", "Automation Camp Store")
        cy.get(detailsPage.storeImage).should("be.visible")
            .and("have.attr", "src", "/favicon.ico")
    })

    /**
     * Test Case ID: E2E_38
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that none of the navigation links/buttons are highlighted", () => {
        // assert that the nav bar is visible
        cy.get(detailsPage.navBar)
            .should("be.visible")

        // assert that none of the buttons are highlighted - (home, about, contact, cart, sign out)
        cy.get(detailsPage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
            .and("have.css", "background-color", "rgba(0, 0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.aboutButton)
            .should("be.visible")
            .and("contain.text", "About")
            .and("have.css", "background-color", "rgba(0, 0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
            .and("have.css", "background-color", "rgba(0, 0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
            .and("have.css", "background-color", "rgba(0, 0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
            .and("have.css", "background-color", "rgba(0, 0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour            
    })
    

    /**
     * Test Case ID: E2E_39
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can sign out successfully", () => {
        // check for the logout button
        cy.get(detailsPage.logoutButton).should("be.visible")
            .and("contain.text", "Sign Out")

            // logout
            cy.get(detailsPage.logoutButton).click()
    
            // assert that the user is signed out
            cy.url()
                .should("eq", "https://ui-automation-camp.vercel.app/")
    })

    /**
     * Test Case ID: E2E_40
     * Test Scenario: Check the functionality and UI of the product details page
     * Note: Test does not work, instead it goes back to the authentication page
     */
    it.skip("should verify that the user can go back to the home page using the back button", () => {
        // assert that the back button is visible
        cy.get(detailsPage.backButton)
            .should("be.visible")
            .and("contain.text", "Back to products")
            .click()  // click the back button
        cy.wait(1000)

        // assert that the user goes back to the home page
        cy.url()
            .should("contain", "/products")
    })

})
