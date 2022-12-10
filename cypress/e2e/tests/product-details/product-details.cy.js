import { product4 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"


describe('Checkout', () => {
    // variables
    let total

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

        // assert that the user is logged in
        cy.get(homePage.title).should("contain", "Products")
        cy.get(homePage.firstProductCard).should("be.visible")
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it('should verify that the user can view the name and details of the product', () => {
        // select product and visit product's information page 
        homePage.goToProductDetailsPage(4)

        // assert that the user is on the product information page
        cy.url().should("contain", "quality-mug")
        cy.get(detailsPage.productName).should("contain", product4.name)
        cy.get(detailsPage.productDescription).should("contain", product4.desc)
        cy.get(detailsPage.productPrice).should("contain", `$${product4.price}.00`)   
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it('should verify that the user cannot modify the name nor details of the product', () => {
        // select product and visit product's information page 
        homePage.goToProductDetailsPage(4)

        // assert that the user cannpt modify the data
        cy.url().should("contain", "quality-mug")
        cy.get(detailsPage.productName).should("not.change")
        cy.get(detailsPage.productDescription).should("not.change")
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it('should verify that the user can modify the product quantity using numbers', () => {
        // select product and visit product's information page 
        homePage.goToProductDetailsPage(4)

        // assert that the user is on the product information page
        cy.url().should("contain", "quality-mug")
        cy.get(detailsPage.productName).should("contain", product4.name)
        cy.get(detailsPage.productDescription).should("contain", product4.desc)
        cy.get(detailsPage.productPrice).should("contain", `$${product4.price}.00`)   

        // modify product quantity using numbers 
        cy.get(detailsPage.productQuantity).type(product4.quantity)

        // assert that the product quantity can be modified using numbers
        cy.get(detailsPage.productQuantity).should("have.text", `${product4.quantity}`)
                                                                .should("not.contain.text", "1")
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it('should verify that the user cannot enter non-numeric characters as input for quantity', () => {
        // select product and visit product's information page 
        homePage.goToProductDetailsPage(4)

        // assert that the user is on the product information page
        cy.url().should("contain", "quality-mug")
        cy.get(detailsPage.productName).should("contain", product4.name)
        cy.get(detailsPage.productDescription).should("contain", product4.desc)
        cy.get(detailsPage.productPrice).should("contain", `$${product4.price}.00`)   

        // modify product quantity using non-numeric character
        cy.get(detailsPage.productQuantity).type("s")

        // assert that the product quantity can be modified using numbers
        cy.get(detailsPage.productQuantity).should("not.contain.text", "s")
                                                                .should("have.text", "")
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it('should verify that the user can view the product images', () => {
        // select product and visit product's information page 
        homePage.goToProductDetailsPage(4)

        // assert that the user is on the product information page
        cy.url().should("contain", "quality-mug")
        cy.get(detailsPage.productName).should("contain", product4.name)
        cy.get(detailsPage.productDescription).should("contain", product4.desc)
        cy.get(detailsPage.productPrice).should("contain", `$${product4.price}.00`)   

        //assert that the user can view the product images
        cy.get(detailsPage.productImage).should("exist")
                                                            .should("be.visible")
    })
    
})