import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"
import { faker } from '@faker-js/faker'

describe('Authentication (01 - 04)', () => {
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')
    })
  
    /**
     * Test Case ID: E2E_1
     * Test Scenario: Check sign up functionality
     */
    it('should verify that the user cannot sign up if one or more input fields are missing', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load and select the sign up section
        cy.wait(1000)
        cy.get(authenticationPage.signupSection).click()

        // attempt to sign up when all fields are empty
        authenticationPage.loginOrSignup(userData.missingData.email, userData.missingData.password)

        // assert that the error messages are displayed
        cy.get(authenticationPage.emailError)
            .should("be.visible")
            .and("contain", userData.missingData.errorMsg[0])
        cy.get(authenticationPage.passwordError)
            .should("be.visible")
            .and("contain", userData.missingData.errorMsg[1])

       
        // attempt to sign up when the email field is empty
        authenticationPage.loginOrSignup(userData.missingEmail.email, userData.missingEmail.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.emailError)
            .should("be.visible")
            .and("contain", userData.missingEmail.errorMsg)
        cy.get( authenticationPage.passwordError)
            .should("not.exist")


        // clear input
        cy.get(authenticationPage.passwordInput).clear()
            
        // attempt to sign up when the password field is empty
        authenticationPage.loginOrSignup(userData.missingPassword.email, userData.missingPassword.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.emailError)
            .should("not.exist")
        cy.get(authenticationPage.passwordError)
            .should("be.visible")
            .and("contain", userData.missingPassword.errorMsg)
    })

    /**
     * Test Case ID: E2E_2
     * Test Scenario: Check sign up functionality
     */
     it('should verify that the user cannot sign up if the email address or password is invalid', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load and select the sign up section
        cy.wait(1000)
        cy.get(authenticationPage.signupSection).click()

        // attempt to sign up when the email address and password is invalid (does not meet predefined criteria)
        authenticationPage.loginOrSignup(userData.invalidData.email, userData.invalidData.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.emailError)
                .should("be.visible")
                .and("contain", userData.invalidData.errorMsg[0])
        cy.get(authenticationPage.passwordError)
                .should("be.visible")
                .and("contain", userData.invalidData.errorMsg[1])
    })

    /**
     * Test Case ID: E2E_3
     * Test Scenario: Check sign up functionality
     */
     it('should verify that the user cannot sign up using an email address that already exists', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load and select the sign up section
        cy.wait(1000)
        cy.get(authenticationPage.signupSection).click()

        // attempt to sign up using an existing email address
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.existingEmailError)
                .should("be.visible")
                .and("contain", userData.existingUser.errorMsg)
    })
    
    /**
     * Test Case ID: E2E_4
     * Test Scenario: Check sign up functionality
     */ 
     it('should verify that the user can sign up using a unique and valid email address and password', () => {
        // variables        
        const email = faker.internet.email()

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load and select the sign up section
        cy.wait(1000)
        cy.get(authenticationPage.signupSection).click()

        // attempt to sign up using a email address and password 
        authenticationPage.loginOrSignup(email, userData.existingUser.password)

        // assert that sign up is successful
        cy.url()
            .should("contain", "https://ui-automation-camp.vercel.app/products")
        cy.get(homePage.navBar)
            .should("be.visible") // check that the nav bar is visible
        cy.get(homePage.homeButton) 
            .should("be.visible") // check that the home button is highlighted
            .and("contain.text", "Home")
            .and("have.css", "background-color", "rgb(49, 151, 149)") // button background colour
            .and("have.css", "color", "rgb(255, 255, 255)") // text colour
    })

})
  