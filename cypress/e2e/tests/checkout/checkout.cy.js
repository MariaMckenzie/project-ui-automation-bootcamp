import { product8 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import checkoutPage from "../../pages/checkout.page"
import homePage from "../../pages/home.page"


describe("Checkout", () => {
    // variables
    let total

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit("/")

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(8000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

        // assert that the user is logged in
        cy.get(homePage.title).should("contain", "Products")
        cy.get(homePage.firstProductCard).should("be.visible")
    })
  

Verifies that the user cannot continue to payment if all the required fields (email, city, country) are empty
Verifies that the user cannot continue to payment if one of the required fields are empty
Verifies that the user can modify their billing information after they move to the payment section
Verifies that the modifications made to the billing address is saved
Verifies that the payment process cannot be completed unless the user enters the card information
Verifies that the user can complete the payment process

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check checkout functionality
     */
    it("should verify that the user cannot go to checkout with an empty cart", () => {
        // go to cart
        cy.get(homePage.cartButton).click()
        
        // assert that the user cannot checkout
        cy.get(cartPage.checkoutButton).should("not.exist")
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check checkout functionality
     */
    it("should verify that the user can move on to 'payments' once all required fields are filled", () => {
        // add product to cart
        homePage.addToCart(8, product8.quantity)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard).should("be.visible")
        cy.get(cartPage.getProductCardData(8)[0]).should("contain", product8.name) // check product name
        cy.get(cartPage.getProductCardData(8)[1]).should("contain", `$${product8.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(8)[2]).should("have.text", `${product8.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal).should("contain", `$${product8.quantity * product8.price}.00`) // check total

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // fill form
        checkoutPage.addBillingInformation(existingUser.name, existingUser.email, existingUser.addr)


    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check checkout functionality
     */
    it("should verify that the user can enter their billing details into the form", () => {
        // add product to cart
        homePage.addToCart(8, product8.quantity)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard).should("be.visible")
        cy.get(cartPage.getProductCardData(8)[0]).should("contain", product8.name) // check product name
        cy.get(cartPage.getProductCardData(8)[1]).should("contain", `$${product8.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(8)[2]).should("have.text", `${product8.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal).should("contain", `$${product8.quantity * product8.price}.00`) // check total

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // fill form
        checkoutPage.addBillingInformation(existingUser.name, existingUser.email, existingUser.addr)
    })
    

})