import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"


describe("Cart (22 - 25)", () => {
    // variables
    let totalQuantity

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit("/")

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)

        // assert that the user is logged in
        cy.get(homePage.title)
            .should("contain", "Products")
        cy.get(homePage.firstProductCard)
            .should("be.visible")
        
        // wait for the page to load
        cy.wait(2000)
    })    

    /**
     * Test Case ID: E2E_22
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can remove products from cart by decrementing the quantity until it reaches zero", () => {        
        // add multiple products to cart
        homePage.addToCart(1, productData.product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, productData.product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, productData.product6.quantity)
        
        // wait for page to load
        cy.wait(2000)

        // remove item from cart by decrementing the quantity
        cartPage.decrementProductQuantity(3)

        // assert that the product is removed and only two products remain
        cy.get(cartPage.getProductCard(3))
            .should("not.exist")
        cy.get(cartPage.getProductCard(2))
            .should("exist")
        cy.get(cartPage.getProductCard(1))
            .should("exist")
    })
    
    /**
     * Test Case ID: E2E_23
     * Test Scenario: Check cart functionality
     */
    it("should verify that the total number of products in the cart is correct", () => {
        // add multiple products to cart
        homePage.addToCart(1, productData.product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, productData.product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, productData.product6.quantity)
        
        // wait for page to load
        cy.wait(2000)

        // calculate total quantity
        totalQuantity = productData.product1.quantity + productData.product4.quantity + productData.product6.quantity    

        // check for correct subtotal
        cy.get(cartPage.totalProducts)
            .should("contain", `${totalQuantity}`)
    })    

    /**
     * Test Case ID: E2E_24
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can go back to 'products' page", () => {
        // add multiple products to cart
        homePage.addToCart(1, productData.product1.quantity)
        
        // wait for page to load
        cy.wait(3000)

        // assert that there is a back button
        cy.get(cartPage.backToHomeButton)
            .should("be.visible")
            .and("contain", "Continue shopping")
        cartPage.closeCart()

        // wait for page to load
        cy.wait(2000)

        // assert that the user is back on the home page once the back button is clicked
        cy.get(homePage.getProductCard(1))
            .should("be.visible")
    })

    /**
     * Test Case ID: E2E_25
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can go to checkout", () => {
        // add multiple products to cart
        homePage.addToCart(1, productData.product1.quantity)
        
        // wait for page to load
        cy.wait(2000)

        // assert that there is a checkout button
        cy.get(cartPage.checkoutButton)
            .should("be.visible")
            .and("contain", "Checkout")

        // assert that the user goes to checkout once the checkout button is clicked
        cy.get(cartPage.checkoutButton).click()
        cy.wait(1000)
        cy.url()
            .should("contain", "checkout")
    })
    
})