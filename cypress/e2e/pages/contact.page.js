
/**
* Contains the locators and selectors found on the contact page. 
*/

class Contact {
    
    /**
     * @returns the selector for the navigation bar
     */
    get navBar () { return ("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)") }


    /**
     * @returns the selector for the store name
     */
    get storeName () { return (".chakra-heading.css-kmq9po") }


    /**
     * @returns the selector for the image with store logo
     */
    get storeImage () { return (".chakra-image.css-0") }
    

    /**
     * @returns the selector for the button linked to the home page
     */
    get homeButton () { return ("#top-home") }


    /**
     * @returns the selector for the button linked to the about page
     */
    get aboutButton () { return ("#top-about") }


    /**
     * @returns the selector for the button linked to the contact page
     */
    get contactButton () { return ("#top-contact") }
    

    /**
     * @returns the selector for the button linked to the cart page
     */
    get cartButton () { return ("#top-cart") }


    /**
     * @returns the selector for the button that logs out the user
     */
    get logoutButton () { return ("#top-sign-out") }


    /**
     * @returns the selector for the title of the page
     */
    get title () { return ("#__next > div:nth-child(2) > div > div > div.css-103gdes > h2") }


    /**
     * @returns the selector for the link to email
     */
    get linkToEmail () { return (".chakra-stack.css-r2h33i > a:nth-child(1)") }


    /**
     * @returns the selector for the link to linkedin
     */
    get linkToLinkedIn () { return (".chakra-stack.css-r2h33i > a:nth-child(3)") }


    /**
     * @returns the selector for the link to twitter
     */
    get linkToTwitter () { return (".chakra-stack.css-r2h33i > a:nth-child(5)") }


    /**
     * @returns the selector for the firstname input field
     */
    get firstNameInput () { return ("#firstName") }


    /**
     * @returns the selector for the firstname input field error
     */
    get firstNameInputError () { return ("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)") }
    

    /**
     * @returns the selector for the lastname input field
     */
    get lastNameInput () { return ("#lastName") }


    /**
     * @returns the selector for the lastname input field error
     */
    get lastNameInputError () { return ("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)") }


    /**
     * @returns the selector for the email input field
     */
    get emailInput () { return ("#email") }


    /**
     * @returns the selector for the email input field error
     */
    get emailInputError () { return ("body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3)") }


    /**
     * @returns the selector for the subject input field
     */
    get subjectInput () { return ("#subject") }


    /**
     * @returns the selector for the message input field
     */
    get messageInput () { return ("#message") }


    /**
     * @returns the selector for the submit button to send the message
     */
    get submitButton () { return (".css-1pdqelo > .chakra-button") }



    // METHODS

    /**
     * Fills the contact form and attempt to submit
     * @param {String} fn firstname
     * @param {String} ln lastname
     * @param {String} email email
     * @param {String} sub subject
     * @param {String} msg message
     */
    completeContactForm (fn, ln, email, sub, msg) {
        cy.get(this.firstNameInput).clear()
        cy.get(this.lastNameInput).clear()
        cy.get(this.emailInput).clear()
        cy.get(this.subjectInput).clear()
        cy.get(this.messageInput).clear()

        if (fn !== "") {
            cy.get(this.firstNameInput).type(fn)
        }

        if (ln !== "") {
            cy.get(this.lastNameInput).type(ln)
        }
        
        if (email !== "") {
            cy.get(this.emailInput).type(email)
        }
        
        if (sub !== "") {
            cy.get(this.subjectInput).type(sub)
        }
        
        if (msg !== "") {
            cy.get(this.messageInput).type(msg)
        }

        cy.get(this.submitButton).click()
    }

}
export default new Contact()
