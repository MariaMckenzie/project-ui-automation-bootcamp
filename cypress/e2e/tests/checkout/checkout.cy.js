import { product20 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"
import cartPage from "../../pages/cart.page"


describe("Checkout", () => {
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)
        
        // wait for the page to load
        cy.wait(2000)
    })

    /**
     * Test Case ID: E2E_45
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the user cannot go to checkout with an empty cart", () => {
        // go to cart
        cy.get(homePage.cartButton).click()

        // assert that the cart is empty and the checkout button does not exist
        cy.get(cartPage.firstProductCard)
        .should("not.be.visible")
        cy.get(cartPage.checkoutButton)
            .should("not.be.visible")
        cy.get(cartPage.checkoutButton)
            .should("not.be.visible")

     })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the user can go back to the home page using the back button", () => { 
        // add an item to cart
        homePage.addToCart(20, product20.quantity)
    
        // wait for the page to load
        cy.wait(2000)
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the order summary is consistent with the cart information", () => { })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the user cannot continue to payment if all the required fields (email, city, country) are empty", () => { })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the user can move on to 'payments' once all required fields are filled", () => { })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the modifications made to the billing address are saved", () => { })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the payment process cannot be completed unless the user enters the card information", () => { })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the user cannot complete the payment process unless the card is not expired", () => { })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it ("should verify that the user can complete the payment process", () => { })
    
})
  