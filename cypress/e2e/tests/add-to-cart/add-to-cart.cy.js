import { existingUser, invalidData, missingData, missingEmail, missingPassword, newUser, nonexistingUser, validUser } from "../../data/product.data"
import authenticationPage from "../../pages/details.page"
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
    it('should verify that the user cannot sign up if one or more input fields are missing', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load and select the sign up section
        cy.wait(1000)
        cy.get(authenticationPage.signupSection).click()

        // attempt to sign in with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

    })

})