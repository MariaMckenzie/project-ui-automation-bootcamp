import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"


describe('Authentication', () => {
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')
    })
  
    /**
     * Test Case ID: E2E_9
     * Test Scenario: Check add-to-cart functionality
     */
    it('should verify that the user can add an item to the cart from the ‘products’ page', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to sign in with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

    })

})