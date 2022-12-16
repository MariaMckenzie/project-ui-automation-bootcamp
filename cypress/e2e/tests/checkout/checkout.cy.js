import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"
import cartPage from "../../pages/cart.page"
import checkoutPage from "../../pages/checkout.page"


describe("Checkout (45 - 49)", () => {
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
     * Test Case ID: E2E_45
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the user cannot go to checkout with an empty cart", () => {
        // go to cart
        cy.visit("https://ui-automation-camp.vercel.app/products#/cart")
        
        // wait for the page to load
        cy.wait(2000)

        // assert that the cart is empty and the checkout button does not exist
        cy.get(cartPage.cartError)
            .should("be.visible")
            .and("contain.text", "Your cart is empty.")
        cy.get(cartPage.firstProductCard)
            .should("not.exist")
        cy.get(cartPage.checkoutButton)
            .should("not.exist")
     })

    /**
     * Test Case ID: E2E_46
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the user can go back to the home page using the back button", () => { 
        // add an item to cart
        homePage.addToCart(20, productData.product20.quantity)
    
        // wait for the page to load
        cy.wait(2000)

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the user can go back to home
        cy.get(checkoutPage.backToHomeButton)
            .should("be.visible")
            .and("contain.text", "Continue shopping")
        
        cy.once('uncaught:exception', () => false);
        cy.get(checkoutPage.backToHomeButton).click()
    })

    /**
     * Test Case ID: E2E_47
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the order summary is correct", () => {         
        // add an item to cart
        homePage.addToCart(20, productData.product20.quantity)

        // calculate the total
        total = productData.product20.price * productData.product20.quantity
    
        // wait for the page to load
        cy.wait(2000)

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // wait for the page to load
        cy.wait(2000)
        
        // assert that the order summary is visible and correct
        cy.get(checkoutPage.cartSummaryDropdown).click()
        cy.get(checkoutPage.cartSummary)
            .should("exist")
            .and("be.visible")
        cy.get(checkoutPage.cartSummaryTitle)
            .should("contain.text", "Order summary")
        cy.get(checkoutPage.getCartSummaryInformation(1)[0])
            .should("contain.text", productData.product20.name)
        cy.get(checkoutPage.getCartSummaryInformation(1)[1])
            .should("contain.text", productData.product20.quantity)
        cy.get(checkoutPage.getCartSummaryInformation(1)[2])
            .should("contain.text", `$${cartPage.numberWithCommas(productData.product20.price * productData.product20.quantity)}.00`)
        cy.get(checkoutPage.cartSummaryTotal)
            .should("contain.text", `$${cartPage.numberWithCommas(total)}.00`)
    })

    /**
     * Test Case ID: E2E_48
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the user cannot continue to payment if all the required fields (email, city, country) are empty", () => {
        // add an item to cart
        homePage.addToCart(20, productData.product20.quantity)

        // calculate the total
        total = productData.product20.price * productData.product20.quantity
    
        // wait for the page to load
        cy.wait(2000)

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the user cannot continue to payments
        cy.get(checkoutPage.continueButton).click()

        // attempt to submit form
        cy.get(checkoutPage.continueButton).click()

        // assert that the user cannot move on and the error messages are visible
        cy.get(checkoutPage.countryError)
            .should("be.visible") // error message
            .and("contain", "This field is required") 
            .and("have.css", "color", "rgb(158, 34, 21)") // text colour
        cy.get(checkoutPage.cityError)
            .should("be.visible") // error message
            .and("contain", "This field is required")
            .and("have.css", "color", "rgb(158, 34, 21)") // text colour
     })

    /**
     * Test Case ID: E2E_49
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the user can move on to 'payments' once all required fields are filled", () => {
        // add an item to cart
        homePage.addToCart(20, productData.product20.quantity)

        // calculate the total
        total = productData.product20.price * productData.product20.quantity
    
        // wait for the page to load
        cy.wait(2000)

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

        // wait for the page to load
        cy.wait(2000)

        // go to payments section
        checkoutPage.addBillingInformation(userData.existingUser.name, userData.existingUser.email, userData.existingUser.addr)
    })

})
  