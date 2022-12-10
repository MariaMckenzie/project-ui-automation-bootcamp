import { product8 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import checkoutPage from "../../pages/checkout.page"
import homePage from "../../pages/home.page"
import thankyouPage from "../../pages/thankyou.page"


describe("Checkout", () => {
    // variables
    let total = product8.quantity * product8.price

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
    it("should verify that the user cannot continue to payment if all the required fields (email, city, country) are empty", () => {
        // add product to cart
        homePage.addToCart(8, product8.quantity)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard).should("be.visible")
        cy.get(cartPage.getProductCardData(8)[0]).should("contain", product8.name) // check product name
        cy.get(cartPage.getProductCardData(8)[1]).should("contain", `$${product8.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(8)[2]).should("have.text", `${product8.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal).should("contain", `$${total}.00`) // check total

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // attempt to submit form
        cy.get(checkoutPage.continueButton).click()

        // assert that the user cannot move on
        cy.get(checkoutPage.emailError).should("be.visible") // error message
                                                          .should("contain", "This field is required") 
        cy.get(checkoutPage.cityError).should("be.visible") // error message
                                                       .should("contain", "This field is required")
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
        cy.get(cartPage.cartTotal).should("contain", `$${total}.00`) // check total

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // fill form
        checkoutPage.addBillingInformation(existingUser.name, existingUser.email, existingUser.addr)

        // assert that the user is at the payment process
        cy.get(checkoutPage.paymentCard).should("exist")
        cy.get(checkoutPage.paymentTitle).should("be.visible").should("contain.text", "Payment")
    })

    /**
     * Test Case ID: E2E_
     * Test Scenario: Check checkout functionality
     */
    it("should verify that the user can modify their billing information after they move to the payment section", () => {
        // add product to cart
        homePage.addToCart(8, product8.quantity)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard).should("be.visible")
        cy.get(cartPage.getProductCardData(8)[0]).should("contain", product8.name) // check product name
        cy.get(cartPage.getProductCardData(8)[1]).should("contain", `$${product8.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(8)[2]).should("have.text", `${product8.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal).should("contain", `$${total}.00`) // check total

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // fill form
        checkoutPage.addBillingInformation(existingUser.name, existingUser.email, existingUser.addr)

        // assert that the user is at the payment process
        cy.get(checkoutPage.paymentCard).should("exist")
        cy.get(checkoutPage.paymentTitle).should("be.visible").should("contain.text", "Payment")

        // select the option to edit billing information
        cy.get(checkoutPage.editBillingButton).click()

        // make changes
        cy.get(checkoutPage.nameInput).clear()
        cy.get(checkoutPage.nameInput).type("Jane Doe")
        cy.get(checkoutPage.emailInput).clear()
        cy.get(checkoutPage.emailInput).type("jane@mail.com")

        // assert that changes are made
        cy.get(checkoutPage.customerInformation).should("contain.text", "Jane Doe")
        cy.get(checkoutPage.customerInformation).should("not.contain.text", existingUser.name)
        cy.get(checkoutPage.customerInformation).should("contain.text", "jane@mail.com")
        cy.get(checkoutPage.customerInformation).should("not.contain.text", existingUser.email)
    })
    
     /**
     * Test Case ID: E2E_
     * Test Scenario: Check checkout functionality
     */
     it("should verify that the user can complete the checkout process", () => {
        // add product to cart
        homePage.addToCart(8, product8.quantity)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard).should("be.visible")
        cy.get(cartPage.getProductCardData(8)[0]).should("contain", product8.name) // check product name
        cy.get(cartPage.getProductCardData(8)[1]).should("contain", `$${product8.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(8)[2]).should("have.text", `${product8.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal).should("contain", `$${total}.00`) // check total

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // fill form
        checkoutPage.addBillingInformation(existingUser.name, existingUser.email, existingUser.addr)

        // assert that the user is at the payment process
        cy.get(checkoutPage.paymentCard).should("exist")
        cy.get(checkoutPage.paymentTitle).should("be.visible").should("contain.text", "Payment")

        // enter card information and complete checkout
        checkoutPage.addCardInformation(existingUser.cardInfo[0], existingUser.cardInfo[1], existingUser.cardInfo[2])

        // assert that checkout is successful
        cy.url().should("contain", "https://ui-automation-camp.vercel.app/products#/order/")
        cy.get(thankyouPage.orderDetails).should("exist")
        cy.get(thankyouPage.title).should("contain.text", "Thank you for your order")
        cy.get(thankyouPage.invoiceNumber).should("be.visible")
        cy.get(thankyouPage.subTotal).should("contain", `$${total}.00`) // check total
    })

})