import { product17 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import detailsPage from "../../pages/details.page"


describe("Product Details", () => {
    
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

        // visit the product details page
        cy.visit("https://ui-automation-camp.vercel.app/products/couch-1")
        
        // wait for the page to load
        cy.wait(1000)
    })

    /**
     * Test Case ID: E2E_35
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
     * Test Case ID: E2E_36
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
     * Test Case ID: E2E_37
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
            .and("have.css", "background-color", "rgb(0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.aboutButton)
            .should("be.visible")
            .and("contain.text", "About")
            .and("have.css", "background-color", "rgb(0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
            .and("have.css", "background-color", "rgb(0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
            .and("have.css", "background-color", "rgb(0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour
        cy.get(detailsPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
            .and("have.css", "background-color", "rgb(0, 0, 0)") // button background colour
            .and("have.css", "color", "rgb(0, 128, 128)") // text colour            
    })
    

    /**
     * Test Case ID: E2E_38
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can sign out successfully", () => {
        // check for the logout button
        cy.get(detailsPage.logoutButton).should("be.visible")
            .and("contain.text", "Sign Out")

        // logout
        cy.get(detailsPage.logoutButton).click()
    })

    /**
     * Test Case ID: E2E_39
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can go back to the home page using the back button", () => {
        // assert that the back button is visible
        cy.get(detailsPage.backButton)
            .should("be.visible")
            .and("contain.text", "Back to products")
            .click()  // click the back button

        // assert that the user goes back to the home page
        cy.url()
            .should("contain", "/products")
    })

    /**
     * Test Case ID: E2E_40
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can view the product images", () => {
        // assert that the product image is visible
        cy.get(detailsPage.productImage)
            .should("be.visible")
            .and("have.attr", "src", "https://images.pexels.com/photos/9086927/pexels-photo-9086927.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800")
    })

    /**
     * Test Case ID: E2E_41
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can view the name and details of the product", () => {
        // assert that the product details are visible and correct
        cy.get(detailsPage.productName)
            .should("be.visible")
            .and("contain.text", product17.name)
        cy.get(detailsPage.productDescription)
            .should("be.visible")
            .and("contain.text", product17.desc)
        cy.get(detailsPage.productPrice)
            .should("be.visible")
            .and("contain.text", product17.price)
        cy.get(detailsPage.productCategory)
            .should("be.visible")
            .and("contain.text", product17.category)
    })

    /**
     * Test Case ID: E2E_42
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can modify the product quantity using numbers", () => {
        // assert that the default quantity is 1
        cy.get(detailsPage.productQuantity)
            .should("contain.value", 1)

        // modify quantity with a valid number
        detailsPage.modifyQuantity(product17.quantity)

        // check that the quantity has changed and is not equal to 1 (default)
        cy.get(detailsPage.productQuantity)
        .should("contain.value", product17.quantity)
        .and("not.contain.value", 1)
    })

    /**
     * Test Case ID: E2E_43
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user cannot modify the quantity of a product with non-numeric characters", () => { 
        // assert that the default quantity is 1
        cy.get(detailsPage.productQuantity)
            .should("contain.value", 1)

        // modify quantity with a non-numeric character
        detailsPage.modifyQuantity("a")
        cy.once('uncaught:exception', () => false);

        // check that the quantity has changed and is not equal to 1 (default)
        cy.get(detailsPage.productQuantity)
        .should("have.text", "")
        .and("not.contain.value", 1)
    })

})
