import { existingUser, invalidData, missingData, missingEmail, missingPassword, newUser, nonexistingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"


describe('Authentication', () => {
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
        authenticationPage.loginOrSignup(missingData.email, missingData.password)

        // assert that the error messages are displayed
       cy.get(authenticationPage.emailError).should("be.visible")
       cy.get(authenticationPage.emailError).should("contain", missingData.errorMsg[0])
       cy.get(authenticationPage.passwordError).should("be.visible")
       cy.get(authenticationPage.passwordError).should("contain", missingData.errorMsg[1])

       
        // attempt to sign up when the email field is empty
        authenticationPage.loginOrSignup(missingEmail.email, missingEmail.password)

        // assert that the error message is displayed
       cy.get(authenticationPage.emailError).should("be.visible")
       cy.get(authenticationPage.emailError).should("contain", missingEmail.errorMsg)
       cy.get(authenticationPage.passwordError).should("not.exist")


       // clear input
       cy.get(authenticationPage.passwordInput).clear()
       
        // attempt to sign up when the password field is empty
        authenticationPage.loginOrSignup(missingPassword.email, missingPassword.password)

        // assert that the error message is displayed
       cy.get(authenticationPage.emailError).should("not.exist")
       cy.get(authenticationPage.passwordError).should("be.visible")
       cy.get(authenticationPage.passwordError).should("contain", missingPassword.errorMsg)
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
        authenticationPage.loginOrSignup(invalidData.email, invalidData.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.emailError).should("be.visible")
        cy.get(authenticationPage.emailError).should("contain", invalidData.errorMsg[0])
        cy.get(authenticationPage.passwordError).should("be.visible")
        cy.get(authenticationPage.passwordError).should("contain", invalidData.errorMsg[1])
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
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.existingEmailError).should("be.visible")
        cy.get(authenticationPage.existingEmailError).should("contain", existingUser.errorMsg)
    })
    
    /**
     * Test Case ID: E2E_4
     * Test Scenario: Check sign up functionality
     */ 
     it.skip('should verify that the user can sign up using a unique and valid email address and password', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load and select the sign up section
        cy.wait(1000)
        cy.get(authenticationPage.signupSection).click()

        // attempt to sign up using a email address and password 
        authenticationPage.loginOrSignup(newUser.email, newUser.password)

        // assert that sign up is successful
        cy.url().should("contain", "https://ui-automation-camp.vercel.app/products")
        cy.get(homePage.cartButton).should("be.visible") // user can see the cart
        cy.get(homePage.contactButton).should("be.visible") // user can go to contact form
        cy.get(homePage.logoutButton).should("be.visible") // user can log out

        // logout
        cy.get(homePage.logoutButton).click()
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check login functionality
     */
     it('should verify that the user cannot login if one or more input fields are missing', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load 
        cy.wait(1000)

        // attempt to login when all fields are empty
        authenticationPage.loginOrSignup(missingData.email, missingData.password)

        // assert that the error messages are displayed
       cy.get(authenticationPage.emailError).should("be.visible")
       cy.get(authenticationPage.emailError).should("contain", missingData.errorMsg[0])
       cy.get(authenticationPage.passwordError).should("be.visible")
       cy.get(authenticationPage.passwordError).should("contain", missingData.errorMsg[1])

       
        // attempt to login when the email field is empty
        authenticationPage.loginOrSignup(missingEmail.email, missingEmail.password)

        // assert that the error message is displayed
       cy.get(authenticationPage.emailError).should("be.visible")
       cy.get(authenticationPage.emailError).should("contain", missingEmail.errorMsg)
       cy.get(authenticationPage.passwordError).should("not.exist")


       // clear input
       cy.get(authenticationPage.passwordInput).clear()
       
        // attempt to login when the password field is empty
        authenticationPage.loginOrSignup(missingPassword.email, missingPassword.password)

        // assert that the error message is displayed
       cy.get(authenticationPage.emailError).should("not.exist")
       cy.get(authenticationPage.passwordError).should("be.visible")
       cy.get(authenticationPage.passwordError).should("contain", missingPassword.errorMsg)
    })
    
    /**
     * Test Case ID: E2E_6
     * Test Scenario: Check login functionality
     */
     it('should verify that the user cannot login using an invalid email address and password combination', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to sign up when all fields are empty
        authenticationPage.loginOrSignup(invalidData.email, invalidData.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.emailError).should("be.visible")
        cy.get(authenticationPage.emailError).should("contain", invalidData.errorMsg[0])
        cy.get(authenticationPage.passwordError).should("not.exist")
    })
    
    /**
     * Test Case ID: E2E_7
     * Test Scenario: Check login functionality
     */    
     it.skip('should verify that the user cannot login using an email address that does not exist', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()
        
        // wait for the page to load
        cy.wait(1000)

        // attempt to sign up when all fields are empty
        authenticationPage.loginOrSignup(nonexistingUser.email, nonexistingUser.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.invalidLoginError).should("be.visible")
        cy.get(authenticationPage.invalidLoginError).should("contain", existingUser.errorMsg)
    })
    
    /**
     * Test Case ID: E2E_8
     * Test Scenario: Check login functionality
     */ 
     it.only('should verify that the user can login using an existing email address and the corresponding password', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to sign up using a email address and password 
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

        // assert that sign up is successful
        cy.url().should("contain", "https://ui-automation-camp.vercel.app/products")
        cy.get(homePage.cartButton).should("be.visible") // user can see the cart
        cy.get(homePage.contactButton).should("be.visible") // user can go to contact form
        cy.get(homePage.logoutButton).should("be.visible") // user can log out

        // logout
        cy.get(homePage.logoutButton).click()
    })
    
})
  