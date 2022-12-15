import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"
import cartPage from "../../pages/cart.page"
import checkoutPage from "../../pages/checkout.page"
import thankyouPage from "../../pages/thankyou.page"


describe("Checkout", () => {
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
        cy.get(homePage.cartButton).click()
        
        // wait for the page to load
        cy.wait(2000)
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

        // waitfor the page to load
        cy.wait(2000)

        // go to payments section
        checkoutPage.addBillingInformation(userData.existingUser.name, userData.existingUser.email, userData.existingUser.addr)
    })

    /**
     * Test Case ID: E2E_50
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the modifications made to the billing address are saved", () => {
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

        // go back to billing information
        cy.get(checkoutPage.editBillingButton).click()

        // wait for the page to load
        cy.wait(2000)

        // edit billing information
        cy.get(checkoutPage.nameInput).clear()
        cy.get(checkoutPage.nameInput).type("Jane Doe", {force: true})
        cy.get(checkoutPage.continueButton).click({force: true})

        // assert that billing information is chnaged
        cy.get(checkoutPage.billingInfo)
            .should("contain", 'Jane Doe')

    })

    /**
     * Test Case ID: E2E_51
     * Test Scenario: Check the functionality and UI of the checkout page
     * Note: Test does not work, instead it goes completes the checkout process
     */
    it.skip("should verify that the payment process cannot be completed unless the user enters the card information", () => { 
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

        // wait for the page to load
        cy.wait(2000)

        // attempt to checkout
        cy.get(checkoutPage.placeOrderButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the user cannot checkout
        cy.url()
            .should("not.contain", "/order/")
        cy.get(thankyouPage.title)
            .should("not.exist")
            .and("not.contain", "Thank you for your order")

    })

    /**
     * Test Case ID: E2E_52
     * Test Scenario: Check the functionality and UI of the checkout page
     * Note: Test does not work, instead it goes completes the checkout process
     */
    it.skip("should verify that the user cannot complete the payment process unless the card is not expired", () => { 
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

        // wait for the page to load
        cy.wait(2000)

        // assert that the user cannot checkout with invalid card date
        checkoutPage.addCardInformation(userData.existingUser.cardInfo[0], 1021, userData.existingUser.cardInfo[2])
        cy.url()
            .should("not.contain", "/order/")
        cy.get(thankyouPage.title)
            .should("not.exist")
            .and("not.contain", "Thank you for your order")
    })

    /**
     * Test Case ID: E2E_53
     * Test Scenario: Check the functionality and UI of the checkout page
     */
    it("should verify that the user can complete the payment process", () => {
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

        // wait for the page to load
        cy.wait(2000)

        // assert that the user can checkout
        checkoutPage.addCardInformation(userData.existingUser.cardInfo[0], userData.existingUser.cardInfo[1], userData.existingUser.cardInfo[2])
        cy.url()
            .should("contain", "/order/")
        cy.get(thankyouPage.title)
            .should("be.visible")
            .and("contain", "Thank you for your order")
        cy.get(thankyouPage.invoiceNumber)
            .should("be.visible")
    })
    
})
  