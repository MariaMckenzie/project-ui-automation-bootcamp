import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import contactPage from "../../pages/contact.page"
import homePage from "../../pages/home.page"
import contactData from "../../data/data-driven/contact.data"

describe('Contact (Data Driven)', () => {

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

        cy.get(homePage.contactButton).click()

        // wait for the page to load
        cy.wait(1000)
    })

    for (const sender of contactData) {
        it(`should attemp to send a ${sender.messageType}`, () => { 
            // attempt to send message
            contactPage.completeContactForm(sender.firstname, sender.lastname, sender.email, sender.subject, sender.message)
        
            if (sender.messageType === "valid message") {
                // assert that the message was sent 
                cy.get('#toast-1')
                    .should('exist') // check for toast to pop up
                cy.get('#toast-1-description')
                    .should('contain','Your message has been sent' ) // check for toast to pop up
            }

            if (sender.messageType === "invalid message") {
                // assert that the errors are visible
                cy.get(contactPage.firstNameInputError)
                    .should("be.visible")
                    .and("contain", "Field is required")
                    .and("have.css", "color", "rgb(229, 62, 62)") // text colour
                cy.get(contactPage.firstNameInput)
                    .should("have.css", "color", "rgb(26, 32, 44)") // check input field border colour

                cy.get(contactPage.lastNameInputError)
                    .should("be.visible")
                    .and("contain", "Field is required")
                    .and("have.css", "color", "rgb(229, 62, 62)") // text colour
                cy.get(contactPage.lastNameInput)
                    .should("have.css", "color", "rgb(26, 32, 44)") // check input field border colour

                cy.get(contactPage.emailInputError)
                    .should("be.visible")
                    .and("satisfy", (elem) => {
                        const text = elem.innerText;
                        return text ===  "Field is required" || text === "Email is invalid";
                    })
                    .and("have.css", "color", "rgb(229, 62, 62)") // text colour
                cy.get(contactPage.emailInput)
                    .should("have.css", "color", "rgb(26, 32, 44)") // check input field border colour
            }
        })
    }

})
