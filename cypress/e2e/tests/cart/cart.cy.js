import { product1, product13, product18, product2, product3, product4, product5, product6 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"


describe('Cart', () => {
    // variables
    let total, totalQuantity

    before(() => {
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
     * Test Scenario: Check cart functionality
     */
    it('should verify that the cart has all the items that were previously added', () => {
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(500)
        cartPage.closeCart()
        homePage.addToCart(4, product4.quantity)
        cy.wait(500)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)

        // assert that the products are in the cart
        cy.get(cartPage.firstProductCard).should("be.visible")

        // product 1
        cy.get(cartPage.getProductCardData(3)[0]).should("contain", product1.name) // check product name
        cy.get(cartPage.getProductCardData(3)[1]).should("contain", `$${product1.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(3)[2]).should("have.text", `${product1.quantity}`) // check product quantity
        // product 2
        cy.get(cartPage.getProductCardData(2)[0]).should("contain", product4.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1]).should("contain", `$${product4.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(2)[2]).should("have.text", `${product4.quantity}`) // check product quantity
        // product 3
        cy.get(cartPage.getProductCardData(1)[0]).should("contain", product6.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1]).should("contain", `$${product6.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2]).should("have.text", `${product6.quantity}`) // check product quantity
    })
    
    /**
     * Test Case ID: E2E_
     * Test Scenario: Check cart functionality
     */
    it('should verify that the user cannot modify the price or subtotal of the product', () => {
        // calculate total
        total = (product1.price * product1.quantity) + (product4.price * product4.quantity) + (product6.price * product6.quantity)

        // check for correct subtotal
        cy.get(cartPage.cartTotal).should("contain", `$${total}.00`)

        // assert that chnages cannot be made
        cy.get(cartPage.getProductCardData(2)[1]).should("not.be.clickable").should("not.change")
        cy.get(cartPage.subtotal).should("not.be.clickable").should("not.change")

    })
    
    /**
     * Test Case ID: E2E_
     * Test Scenario: Check cart functionality
     */
    it('should verify that the total number of items added to the cart is consistent with the product quantities', () => {
        // calculate total quantity
        totalQuantity = product1.quantity + product4.quantity + product6.quantity    

        // check for correct subtotal
        cy.get(cartPage.totalProducts).should("contain", `${totalQuantity}`)
    })
    
    
    /**
     * Test Case ID: E2E_
     * Test Scenario: Check cart functionality
     */
    it('should verify that the user can modify the quantity of a product in the cart', () => {
        // select one item and modify the quanitity
        cartPage.incrementProductQuantity(2)
        cartPage.decrementProductQuantity(1)
        
        // assert that the quantity is changed
        cy.get(cartPage.getProductCardData(2)[2]).should("have.text", `${product4.quantity + 1}`) // check product quantity
        cy.get(cartPage.getProductCardData(1)[2]).should("have.text", `${product6.quantity - 1}`) // check product quantity
    })
    
    
    /**
     * Test Case ID: E2E_
     * Test Scenario: Check cart functionality
     */
    it('should verify that the user can remove items from cart', () => {
        // remove item from cart
        cartPage.removeProductFromCart(3) // remove product1

        // assert that the product is removed and only two products remain
        cy.get(cartPage.getProductCard(3)).should("not.exist")
        cy.get(cartPage.getProductCard(2)).should("exist")
        cy.get(cartPage.getProductCard(1)).should("exist")
    })
    
})