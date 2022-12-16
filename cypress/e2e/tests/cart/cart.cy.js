import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"


describe("Cart (18 - 21)", () => {
    // variables
    let total

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
     * Test Case ID: E2E_18
     * Test Scenario: Check cart functionality
     */
    it("should verify that the cart has all the items that were previously added", () => {
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

        // assert that the products are in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")

        // product 1
        cy.get(cartPage.getProductCardData(3)[0])
            .should("contain", productData.product1.name) // check product name
        cy.get(cartPage.getProductCardData(3)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product1.price * productData.product1.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(3)[2])
            .should("have.text", `${productData.product1.quantity}`) // check product quantity
        // product 2
        cy.get(cartPage.getProductCardData(2)[0])
            .should("contain", productData.product4.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product4.price * productData.product4.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(2)[2])
            .should("have.text", `${productData.product4.quantity}`) // check product quantity
        // product 3
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product6.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product6.price * productData.product6.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product6.quantity}`) // check product quantity
    })
    
    /**
     * Test Case ID: E2E_19
     * Test Scenario: Check cart functionality
     */
    it("should verify that the price for each product and the overall total are correct", () => {
        // add multiple products to cart
        homePage.addToCart(1, productData.product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(4, productData.product4.quantity)

        // wait for page to load
        cy.wait(2000)

        // calculate total
        total = (productData.product1.price * productData.product1.quantity) + (productData.product4.price * productData.product4.quantity)

        // assert that the cart total and the product prices are correct
        cy.get(cartPage.cartTotal)
            .should("contain", `$${cartPage.numberWithCommas(total)}.00`)

        // product 1
        cy.get(cartPage.getProductCardData(2)[0])
            .should("contain", productData.product1.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product1.price * productData.product1.quantity)}.00`) // check product price
        // product 2
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product4.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product4.price * productData.product4.quantity)}.00`) // check product price
    })
    
    /**
     * Test Case ID: E2E_20
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can modify the quantity of a product in the cart", () => {
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

        // select one item and modify the quanitity
        cartPage.incrementProductQuantity(2) // modify product 2
        cartPage.decrementProductQuantity(1) // modify product 1 
        
        // assert that the quantity is changed
        cy.get(cartPage.getProductCardData(2)[2])
            .should("have.text", `${productData.product4.quantity + 1}`) // check product quantity
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product6.quantity - 1}`) // check product quantity
    })

    /**
     * Test Case ID: E2E_21
     * Test Scenario: Check cart functionality
     */
    it("should verify that the user can remove products from the cart using the bin icon", () => {        
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

        // remove item from cart
        cartPage.removeProductFromCart(3) // remove productData.product1

        // assert that the product is removed and only two products remain
        cy.get(cartPage.getProductCard(3))
            .should("not.exist")
        cy.get(cartPage.getProductCard(2))
            .should("exist")
        cy.get(cartPage.getProductCard(1))
            .should("exist")
    })
    
})