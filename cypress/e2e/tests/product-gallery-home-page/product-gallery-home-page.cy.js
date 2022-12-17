import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"

describe('Product Gallery / Home Page (26 - 30)', () => {
    // variables
    let total

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
    })


    /**
     * Test Case ID: E2E_26
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the ‘Home’ button is active", () => {
        // assert that the home button is visible
        cy.get(homePage.homeButton)            
            .should("be.visible")
            .and("contain.text", "Home")
            .and("have.css", "background-color", "rgb(49, 151, 149)") // button background colour
            .and("have.css", "color", "rgb(255, 255, 255)") // text colour
    })

    /**
     * Test Case ID: E2E_27
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the navigation bar is visible", () => {
        // assert that the nav bar is visible
        cy.get(homePage.navBar)
            .should("be.visible")

        // assert that the buttons in the nav bar are visible - (home, about, contact, cart, sign out)
        cy.get(homePage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
        cy.get(homePage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
        cy.get(homePage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
        cy.get(homePage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
    })

    /**
     * Test Case ID: E2E_28
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the store’s name and logo are visible at the top of the page", () => {        
        // assert that the nav bar is visible
        cy.get(homePage.navBar)
            .should("be.visible")
        
        // assert that the logo and store name are visible
        cy.get(homePage.storeName)
            .should("be.visible")
            .and("contain", "Automation Camp Store")
        cy.get(homePage.storeImage)
            .should("be.visible")
            .and("have.attr", "src", "/favicon.ico")
    })

    /**
     * Test Case ID: E2E_29
     * Test Scenario: Check the functionality and UI of the product home page
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

    /**
     * Test Case ID: E2E_30
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the search bar, and sort and filter options are visible.", () => {
        // check for the first product 
        cy.get(homePage.getProductCard(1))
            .should("be.visible")
            .and("contain.text", productData.product1.name)

        // check for other products
        cy.get(homePage.getProductCard(productData.product5.number))
            .should("be.visible")
            .and("contain.text", productData.product5.name)
        cy.get(homePage.getProductCard(productData.product17.number))
            .should("be.visible")
            .and("contain.text", productData.product17.name)
        cy.get(homePage.getProductCard(productData.product22.number))
            .should("be.visible") // last product
            .and("contain.text", productData.product22.name)
    })

})
