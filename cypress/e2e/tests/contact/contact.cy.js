import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import contactPage from "../../pages/contact.page"
import homePage from "../../pages/home.page"

describe('Contact (73 - 76)', () => {
    // variables
    let links

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)
        
        // wait for the page to load
        cy.wait(2000)

        cy.get(homePage.contactButton).click()

        // wait for the page to load
        cy.wait(1000)
    })


     /**
     * Test Case ID: E2E_73
     * Test Scenario: Check the functionality and UI of the product contact page
     */
     it("should verify that the Contact button is active", () => {
        // assert that the home button is visible
        cy.get(contactPage.contactButton)            
            .should("be.visible")
            .and("contain.text", "Contact")
            .and("have.css", "background-color", "rgb(49, 151, 149)") // button background colour
            .and("have.css", "color", "rgb(255, 255, 255)") // text colour
    })

    
    /**
     * Test Case ID: E2E_74
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the navigation bar is visible", () => {
        // assert that the nav bar is visible
        cy.get(contactPage.navBar)
            .should("be.visible")

        // assert that the buttons in the nav bar are visible - (home, about, contact, cart, sign out)
        cy.get(contactPage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
        cy.get(contactPage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
        cy.get(contactPage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
        cy.get(contactPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
    })

    /**
     * Test Case ID: E2E_75
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the store’s name and logo are visible at the top of the page", () => {        
        // assert that the nav bar is visible
        cy.get(contactPage.navBar)
            .should("be.visible")
        
        // assert that the logo and store name are visible
        cy.get(contactPage.storeName)
            .should("be.visible")
            .and("contain", "Automation Camp Store")
        cy.get(contactPage.storeImage)
            .should("be.visible")
            .and("have.attr", "src", "/favicon.ico")
    })

    /**
     * Test Case ID: E2E_76
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the user can sign out successfully", () => {
        // assert that the sign out button is visible
        cy.get(homePage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")

        // logout
        cy.get(homePage.logoutButton).click()

        // assert that the user is signed out
        cy.url()
            .should("eq", "https://ui-automation-camp.vercel.app/")
    })

})
