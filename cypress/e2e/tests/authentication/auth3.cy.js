import userData from "../../data/data-driven/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"


describe('Authentication - Data Driven (Login)', () => {
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')
    })
    
    for(const user of userData){
        it( `should attempt to login ${user.userType}`, () => {
            cy.get(authenticationPage.signInOrRegisterButton).click()

            // wait for the page to load 
            cy.wait(1000)

            // clear inputs fields
            cy.get(authenticationPage.emailInput).clear()
            cy.get(authenticationPage.passwordInput).clear()
    
            // attempt to login
            authenticationPage.loginOrSignup(user.email, user.password)

            // check for error messages and successful login
            if (user.userType === "an existing user") {
                cy.get(authenticationPage.emailError)
                    .should("not.exist")
                cy.get(authenticationPage.passwordError)
                    .should("not.exist")
                cy.get(authenticationPage.invalidLoginError)
                    .should("not.exist")
                expect(cy.get(homePage.title), "Products")
            }

            if (user.userType === "a user that does not exist") {                
                cy.get(authenticationPage.invalidLoginError)
                    .should("exist")
                    .and("contain.text", "Wrong email or password")
            }

            if (user.userType === "a user whose email and password are not valid") {   
                cy.get(authenticationPage.emailError)
                    .should("exist")
                    .and("contain.text", "Email is invalid")
            }

            if (user.userType === "a user without an email") {                
                cy.get(authenticationPage.emailError)
                    .should("exist")
                    .and("contain.text", "Email can't be blank")
                cy.get(authenticationPage.passwordError)
                    .should("not.exist")
            }

            if (user.userType === "a user without a password") {                
                cy.get(authenticationPage.emailError)
                    .should("not.exist")
                cy.get(authenticationPage.passwordError)
                    .should("exist")
                    .and("contain.text", "Password can't be blank")
            }

            if (user.userType === "a user who leaves both fields blank") {                
                cy.get(authenticationPage.emailError)
                    .should("exist")
                    .and("contain.text", "Email can't be blank")
                cy.get(authenticationPage.passwordError)
                    .should("exist")
                    .and("contain.text", "Password can't be blank")
            }
        });
    }
    
})
