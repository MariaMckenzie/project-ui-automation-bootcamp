import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"

describe('Product Gallery / Home Page (31 - 35)', () => {
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
     * Test Case ID: E2E_31
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can view all products in the inventory", () => {
        // check for the first product 
        cy.get(homePage.getProductCard(1))
            .should("be.visible")
            .and("contain.text", productData.product1.name)

        // check for other products
        cy.get(homePage.getProductCard(5))
            .should("be.visible")
            .and("contain.text", productData.product5.name)
        cy.get(homePage.getProductCard(17))
            .should("be.visible")
            .and("contain.text", productData.product17.name)
        cy.get(homePage.getProductCard(22))
            .should("be.visible") // last product
            .and("contain.text", productData.product22.name)
    })

    /**
     * Test Case ID: E2E_32
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can select a product", () => {
        // check for a product
        cy.get(homePage.getProductCard(productData.product5.number))
            .should("be.visible")
            .and("contain.text", productData.product5.name)

        // select the product
        homePage.goToProductDetailsPage(productData.product5.number)

        // assert that the user is redirected to the product details page 
        cy.url()
            .should("contain", "quality-pillow")
        cy.get(detailsPage.productName)
            .should("contain.text", productData.product5.name)
    })

    /**
     * Test Case ID: E2E_33
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can view the total of their cart", () => {
        // add product to cart
        homePage.addToCart(productData.product19.number, productData.product19.quantity)

        // calculate total
        total = productData.product19.price * productData.product19.quantity

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${total}.00`) // check price
    })

    /**
     * Test Case ID: E2E_34
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can modify the quantity of a product using numeric characters", () => {
        // check that the default quantity is 1
        cy.get(`${homePage.getProductCard(productData.product13.number)} ${homePage.productQuantity}`)
            .should("contain.value", 1)

        // modify quantity
        homePage.modifyQuantity(productData.product13.number, productData.product13.quantity)

        // check that the quantity has changed and is not equal to 1 (default)
        cy.get(`${homePage.getProductCard(productData.product13.number)} ${homePage.productQuantity}`)
            .should("contain.value", productData.product13.quantity)
            .and("not.contain", "1")
    })

    /**
     * Test Case ID: E2E_35
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user cannot modify the quantity of a product with non-numeric characters", () => {  
        // check that the default quantity is 1
        cy.get(`${homePage.getProductCard(productData.product13.number)} ${homePage.productQuantity}`)
            .should("contain.value", 1)

        // add product to cart using invalid input 
        homePage.addToCart(productData.product13.number, "a")
        cy.once('uncaught:exception', () => false);

        // check that the quantity input has now become blank
        cy.get(`${homePage.getProductCard(productData.product13.number)} ${homePage.productQuantity}`)
            .should("have.text", "")
            .and("not.contain", "1")
    })

})

