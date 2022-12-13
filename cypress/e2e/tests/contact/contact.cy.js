import { existingUser } from "../../data/user.data"
import { msg1 } from "../../data/sender.data"
import authenticationPage from "../../pages/authentication.page"
import contactPage from "../../pages/contact.page"
import homePage from "../../pages/home.page"

describe('Contact', () => {
    // variables
    let links

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

        cy.get(homePage.contactButton).click()

        // wait for the page to load
        cy.wait(1000)
    })


     /**
     * Test Case ID: E2E_73
     * Test Scenario: Check the functionality and UI of the product contact page
     */
     it("should verify that the Contact button is active", () => {
        // assert that the home button is visible
        cy.get(contactPage.contactButton)            
            .should("be.visible")
            .and("contain.text", "Contact")
            .and("have.css", "background-color", "rgb(49, 151, 149)") // button background colour
            .and("have.css", "color", "rgb(255, 255, 255)") // text colour
    })

    
    /**
     * Test Case ID: E2E_74
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the navigation bar is visible", () => {
        // assert that the nav bar is visible
        cy.get(contactPage.navBar)
            .should("be.visible")

        // assert that the buttons in the nav bar are visible - (home, about, contact, cart, sign out)
        cy.get(contactPage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
        cy.get(contactPage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
        cy.get(contactPage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
        cy.get(contactPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
    })

    /**
     * Test Case ID: E2E_75
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the store’s name and logo are visible at the top of the page", () => {        
        // assert that the nav bar is visible
        cy.get(contactPage.navBar)
            .should("be.visible")
        
        // assert that the logo and store name are visible
        cy.get(contactPage.storeName)
            .should("be.visible")
            .and("contain", "Automation Camp Store")
        cy.get(contactPage.storeImage)
            .should("be.visible")
            .and("have.attr", "src", "/favicon.ico")
    })

    /**
     * Test Case ID: E2E_76
     * Test Scenario: Check the functionality and UI of the product contact page
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
     * Test Case ID: E2E_77
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the user cannot send a message unless all the required fields are filled", () => {        
        // attempt to send message without filling any input fields
        cy.get(contactPage.submitButton).click()
        
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
            .and("contain", "Field is required")
            .and("have.css", "color", "rgb(229, 62, 62)") // text colour
        cy.get(contactPage.emailInput)
            .should("have.css", "color", "rgb(26, 32, 44)") // check input field border colour
    })
    
    /**
     * Test Case ID: E2E_78
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the user can send a message", () => {        
        // attempt to send message with valid data
        contactPage.completeContactForm(msg1.firstname, msg1.lastname, msg1.email, msg1.subject, msg1.message)
        
        // assert that the message was sent 
        cy.get('#toast-1')
            .should('exist') // check for toast to pop up
        cy.get('#toast-1-description')
            .should('contain','Your message has been sent' ) // check for toast to pop up
        
    })
    
    /**
     * Test Case ID: E2E_79
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the user cannot the message unless the email is valid", () => {        
        // attempt to send message with valid data
        cy.get(contactPage.emailInput).type("email")
        cy.get(contactPage.submitButton).click()
        
        // assert that the error is visible
        cy.get(contactPage.emailInputError)
            .should("be.visible")
            .and("contain", "Email is invalid")
    })
    
    /**
     * Test Case ID: E2E_80
     * Test Scenario: Check the functionality and UI of the product contact page
     */
    it("should verify that the links are visible and link to their corresponding account", () => { 
        links = ["mailto:info@qualityworkscg.com", 
                    "https://www.linkedin.com/company/qualityworks-consulting-group-llc",
                    "https://twitter.com/qualityworkscg" 
                ]
        // assert that the button is linked to email 
        cy.get(contactPage.linkToEmail)
            .should("be.visible")
            .and("have.attr", "href", links[0])
            .and("contain.text", "info@qualityworkscg.com")
        
        // assert that the button is linked to a linkedin account
        cy.get(contactPage.linkToLinkedIn)
            .should("be.visible")
            .and("have.attr", "href", links[1])
            .and("contain.text", "Linkedin")
        
        // assert that the button is linked to a twitter account
        cy.get(contactPage.linkToTwitter)
            .should("be.visible")
            .and("have.attr", "href", links[2])
            .and("contain.text", "Twitter")
    })

})
