import { product1, product13, product17, product18, product19, product2, product22, product3, product5, product6 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"

describe('Product Gallery (Home Page)', () => {
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
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)
        
        // wait for the page to load
        cy.wait(2000)
    })


    /**
     * Test Case ID: E2E_26
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the ‘Home’ button is active", () => {
        // assert that the home button is visible
        cy.get(homePage.homeButton)            
            .should("be.visible")
            .and("contain.text", "Home")
            .and("have.css", "background-color", "rgb(49, 151, 149)") // button background colour
            .and("have.css", "color", "rgb(255, 255, 255)") // text colour
    })

    /**
     * Test Case ID: E2E_27
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the navigation bar is visible", () => {
        // assert that the nav bar is visible
        cy.get(homePage.navBar)
            .should("be.visible")

        // assert that the buttons in the nav bar are visible - (home, about, contact, cart, sign out)
        cy.get(homePage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
        cy.get(homePage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
        cy.get(homePage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
        cy.get(homePage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
    })

    /**
     * Test Case ID: E2E_28
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the store’s name and logo are visible at the top of the page", () => {        
        // assert that the nav bar is visible
        cy.get(homePage.navBar)
            .should("be.visible")
        
        // assert that the logo and store name are visible
        cy.get(homePage.storeName)
            .should("be.visible")
            .and("contain", "Automation Camp Store")
        cy.get(homePage.storeImage)
            .should("be.visible")
            .and("have.attr", "src", "/favicon.ico")
    })

    /**
     * Test Case ID: E2E_29
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can sign out successfully", () => {
        // assert that the sign out button is visible
        cy.get(homePage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")

        // logout
        cy.get(homePage.logoutButton).click()

        // assert that the user is signed out
        cy.url()
            .should("eq", "https://ui-automation-camp.vercel.app/")
    })

    /**
     * Test Case ID: E2E_30
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the search bar, and sort and filter options are visible.", () => {
        // check for the first product 
        cy.get(homePage.getProductCard(1))
            .should("be.visible")
            .and("contain.text", product1.name)

        // check for other products
        cy.get(homePage.getProductCard(5))
            .should("be.visible")
            .and("contain.text", product5.name)
        cy.get(homePage.getProductCard(17))
            .should("be.visible")
            .and("contain.text", product17.name)
        cy.get(homePage.getProductCard(22))
            .should("be.visible") // last product
            .and("contain.text", product22.name)
    })

    /**
     * Test Case ID: E2E_30
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can view all products in the inventory", () => {
        // check for the first product 
        cy.get(homePage.getProductCard(1))
            .should("be.visible")
            .and("contain.text", product1.name)

        // check for other products
        cy.get(homePage.getProductCard(5))
            .should("be.visible")
            .and("contain.text", product5.name)
        cy.get(homePage.getProductCard(17))
            .should("be.visible")
            .and("contain.text", product17.name)
        cy.get(homePage.getProductCard(22))
            .should("be.visible") // last product
            .and("contain.text", product22.name)
    })

    /**
     * Test Case ID: E2E_31
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can select a product", () => {
        // check for a product
        cy.get(homePage.getProductCard(5))
            .should("be.visible")
            .and("contain.text", product5.name)

        // select the product
        homePage.goToProductDetailsPage(5)

        // assert that the user is redirected to the product details page 
        cy.url()
            .should("contain", "quality-pillow")
        cy.get(detailsPage.productName)
            .should("contain.text", product5.name)
    })

    /**
     * Test Case ID: E2E_32
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can view the total of their cart", () => {
        // add product to cart
        homePage.addToCart(19, product19.quantity)

        // calculate total
        total = product19.price * product19.quantity

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${total}.00`) // check price
    })

    /**
     * Test Case ID: E2E_33
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user can modify the quantity of a product using numeric characters", () => {
        // check that the default quantity is 1
        cy.get(`${homePage.getProductCard(13)} ${homePage.productQuantity}`)
            .should("contain.value", 1)

        // modify quantity
        homePage.modifyQuantity(13, product13.quantity)

        // check that the quantity has changed and is not equal to 1 (default)
        cy.get(`${homePage.getProductCard(13)} ${homePage.productQuantity}`)
            .should("contain.value", product13.quantity)
            .and("not.contain", "1")
    })

    /**
     * Test Case ID: E2E_34
     * Test Scenario: Check the functionality and UI of the product home page
     */
    it("should verify that the user cannot modify the quantity of a product with non-numeric characters", () => {  
        // check that the default quantity is 1
        cy.get(`${homePage.getProductCard(13)} ${homePage.productQuantity}`)
            .should("contain.value", 1)

        // add product to cart using invalid input 
        homePage.addToCart(13, "a")
        cy.once('uncaught:exception', () => false);

        // check that the quantity input has now become blank
        cy.get(`${homePage.getProductCard(13)} ${homePage.productQuantity}`)
            .should("have.text", "")
            .and("not.contain", "1")
    })

})
