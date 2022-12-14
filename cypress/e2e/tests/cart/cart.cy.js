import { product1, product4, product6 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"


describe("Cart", () => {
    // variables
    let total, totalQuantity

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit("/")

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

        // assert that the user is logged in
        cy.get(homePage.title)
            .should("contain", "Products")
        cy.get(homePage.firstProductCard)
            .should("be.visible")
        
        // wait for the page to load
        cy.wait(2000)
    })    


    /**
     * Test Case ID: E2E_18
     * Test Scenario: Check cart functionality
     */
    it("should verify that the cart has all the items that were previously added", () => {
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)

        // wait for page to load
        cy.wait(2000)

        // assert that the products are in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")

        // product 1
        cy.get(cartPage.getProductCardData(3)[0])
            .should("contain", product1.name) // check product name
        cy.get(cartPage.getProductCardData(3)[1])
            .should("contain", `$${cartPage.numberWithCommas(product1.price * product1.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(3)[2])
            .should("have.text", `${product1.quantity}`) // check product quantity
        // product 2
        cy.get(cartPage.getProductCardData(2)[0])
            .should("contain", product4.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1])
            .should("contain", `$${cartPage.numberWithCommas(product4.price * product4.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(2)[2])
            .should("have.text", `${product4.quantity}`) // check product quantity
        // product 3
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product6.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(product6.price * product6.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product6.quantity}`) // check product quantity
    })
    
    /**
     * Test Case ID: E2E_19
     * Test Scenario: Check cart functionality
     */
    it("should verify that the price for each product and the overall total are correct", () => {
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)

        // wait for page to load
        cy.wait(2000)

        // calculate total
        total = (product1.price * product1.quantity) + (product4.price * product4.quantity)

        // assert that the cart total and the product prices are correct
        cy.get(cartPage.cartTotal)
            .should("contain", `$${cartPage.numberWithCommas(total)}.00`)

        // product 1
        cy.get(cartPage.getProductCardData(2)[0])
            .should("contain", product1.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1])
            .should("contain", `$${cartPage.numberWithCommas(product1.price * product1.quantity)}.00`) // check product price
        // product 2
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product4.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(product4.price * product4.quantity)}.00`) // check product price
    })
    
    /**
     * Test Case ID: E2E_20
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can modify the quantity of a product in the cart", () => {
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)
        
        // wait for page to load
        cy.wait(2000)

        // select one item and modify the quanitity
        cartPage.incrementProductQuantity(2) // modify product 2
        cartPage.decrementProductQuantity(1) // modify product 1 
        
        // assert that the quantity is changed
        cy.get(cartPage.getProductCardData(2)[2])
            .should("have.text", `${product4.quantity + 1}`) // check product quantity
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product6.quantity - 1}`) // check product quantity
    })

    /**
     * Test Case ID: E2E_21
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can remove products from the cart using the bin icon", () => {        
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)
        
        // wait for page to load
        cy.wait(2000)

        // remove item from cart
        cartPage.removeProductFromCart(3) // remove product1

        // assert that the product is removed and only two products remain
        cy.get(cartPage.getProductCard(3))
            .should("not.exist")
        cy.get(cartPage.getProductCard(2))
            .should("exist")
        cy.get(cartPage.getProductCard(1))
            .should("exist")
    })

    /**
     * Test Case ID: E2E_22
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can remove products from cart by decrementing the quantity until it reaches zero", () => {        
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)
        
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
        homePage.addToCart(1, product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)
        
        // wait for page to load
        cy.wait(2000)

        // calculate total quantity
        totalQuantity = product1.quantity + product4.quantity + product6.quantity    

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
        homePage.addToCart(1, product1.quantity)
        
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
        homePage.addToCart(1, product1.quantity)
        
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