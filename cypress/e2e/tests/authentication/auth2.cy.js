import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"


describe('Authentication (05 - 08)', () => {
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')
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
        authenticationPage.loginOrSignup(userData.missingData.email, userData.missingData.password)

        // assert that the error messages are displayed
       cy.get(authenticationPage.emailError)
            .should("be.visible")
            .and("contain", userData.missingData.errorMsg[0])
       cy.get(authenticationPage.passwordError)
            .should("be.visible")
            .and("contain", userData.missingData.errorMsg[1])

       
        // attempt to login when the email field is empty
        authenticationPage.loginOrSignup(userData.missingEmail.email, userData.missingEmail.password)

        // assert that the error message is displayed
       cy.get(authenticationPage.emailError)
            .should("be.visible")
            .and("contain", userData.missingEmail.errorMsg)
       cy.get(authenticationPage.passwordError)
            .should("not.exist")


       // clear input
       cy.get(authenticationPage.passwordInput).clear()
       
        // attempt to login when the password field is empty
        authenticationPage.loginOrSignup(userData.missingPassword.email, userData.missingPassword.password)

        // assert that the error message is displayed
       cy.get(authenticationPage.emailError)
            .should("not.exist")
       cy.get(authenticationPage.passwordError)
            .should("be.visible")
            .and("contain", userData.missingPassword.errorMsg)
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
        authenticationPage.loginOrSignup(userData.invalidData.email, userData.invalidData.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.emailError)
                .should("be.visible")
                .and("contain", userData.invalidData.errorMsg[0])
        cy.get(authenticationPage.passwordError)
                .should("not.exist")
    })
    
    /**
     * Test Case ID: E2E_7
     * Test Scenario: Check login functionality
     */    
    it('should verify that the user cannot login using an email address that does not exist', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()
        
        // wait for the page to load
        cy.wait(1000)

        // attempt to sign up when all fields are empty
        authenticationPage.loginOrSignup(userData.nonexistingUser.email, userData.nonexistingUser.password)

        // assert that the error message is displayed
        cy.get(authenticationPage.invalidLoginError)
                .should("be.visible")
                .and("contain", userData.nonexistingUser.errorMsg)
    })
    
    /**
     * Test Case ID: E2E_8
     * Test Scenario: Check login functionality
     */ 
    it('should verify that the user can login using an existing email address and the corresponding password', () => {
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to sign up using a email address and password 
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)

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
  