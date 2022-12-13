import { product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17, product18, product19, product20, product21, product22 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"

describe('Search', () => {
    // variables
    let key

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
     * Test Case ID: E2E_67
     * Test Scenario: Check the functionality of the search
     */
    it("should verify that the user cannot search for a product using the product price, special characters or any number", () => {
        // search for product using price
        key = '23'
        homePage.search(key)

        // assert that there is no result
        cy.get(homePage.firstProductCard)
            .should("not.exist")
    })
    
    /**
     * Test Case ID: E2E_68
     * Test Scenario: Check the functionality of the search
     */
    it("should verify that the search results will be empty if the product does not exist", () => {
        // search for product that does not exist
        key = 'banana'
        homePage.search(key)

        // assert that there is no result
        cy.get(homePage.firstProductCard)
            .should("not.exist")
    })

    
    /**
     * Test Case ID: E2E_69
     * Test Scenario: Check the functionality of the search
     */
    it("should verify that the user cannot inject code into the search bar", () => {
        // search for product using price
        key = "alert('Hello there')"
        homePage.search(key)

        // assert that there is no alert
        let spy = cy.spy(window, 'alert');
        expect(spy).to.not.be.called;
    })
    
    /**
     * Test Case ID: E2E_70
     * Test Scenario: Check the functionality of the search
     */
    it("should verify that the user can leave the search blank to see all products", () => {
        // leave serach bar blank
        cy.get(homePage.resetButton).click()

        // assert that all products are displayed
        cy.get(homePage.getProductCard(1)) // first product in inventory
            .should("exist")
            .and("be.visible")
        
        cy.get(homePage.getProductCard(5))
            .should("exist")
            .and("be.visible")
        
        cy.get(homePage.getProductCard(13))
            .should("exist")
            .and("be.visible")
        
        cy.get(homePage.getProductCard(22)) // last product in the inventory
            .should("exist")
            .and("be.visible") 
    })

    /**
     * Test Case ID: E2E_71
     * Test Scenario: Check the functionality of the search
     */
    it("should verify that the user can search for an existing product", () => {
        // search for product using price
        key = "mousepad"
        homePage.search(key)

        // assert that there is at least one result from the search
        cy.get(homePage.getProductCard(1)) // first product in inventory
            .should("exist")
            .and("be.visible")
    })

    
    /**
     * Test Case ID: E2E_72
     * Test Scenario: Check the functionality of the search
     */
    it("should verify that the user can search for a product within a category", () => {
        // select category
        homePage.filterProducts("pant")

        // search for product using price
        key = "cargo"
        homePage.search(key)

        // assert that there is at least one result from the search
        cy.get(homePage.getProductCard(1)) // first product in inventory
            .should("exist")
            .and("be.visible")
    })

})
