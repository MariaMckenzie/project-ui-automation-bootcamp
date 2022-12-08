
/**
* Contains the locators and selectors found on the login page. 
*/

class Authentication {

    /**
     * @returns the link to go to login section
     */
    get loginSection () { return ("div.auth0-lock-tabs-container > ul > li:nth-child(1) > a") }


    /**
     * @returns the link to go to signup section
     */
    get signupSection () { return ("div.auth0-lock-tabs-container > ul > li:nth-child(2) > a") }


    /**
     * @returns the button to signup or register
     */
    get signInOrRegisterButton () { return ("#signInOrRegister") }
    

    /**
     * @returns the input field for the username
     */
     get emailInput () { return ("#1-email") }
    

    /**
     * @returns the input field for the password
     */
    get passwordInput () { return ("#1-password") }

    
    /**
     * @returns the button to log in
     */
    get submitButton () { return ("#1-submit") }

     
    /**
     * @returns the error message for email
     */
    get emailError () { return ("#auth0-lock-error-msg-email") }


    /**
     * @returns the error message for password
     */
    get passwordError () { return ("#auth0-lock-error-msg-password") }


    /**
     * @returns the error message for existing email
     */
    get existingEmailError () { return ("div.auth0-lock-content-body-wrapper > div:nth-child(1) > div > div > span > span") }


    /**
     * @returns the error message for invalid login
     */
    get invalidLoginError () { return ("div.auth0-lock-content-body-wrapper > div:nth-child(1) > div > div > span > span") }


    // METHODS

    /**
     * Logs in or signs up the user
     * @param {String} username
     * @param {String} password
     */
    loginOrSignup (username, password) { 
        if (username === '' & password === '') {
            cy.get(this.submitButton).click()
        } else if (password === '') {
            cy.get(this.emailInput).type(username)
            cy.get(this.submitButton).click()
        } else if (username === '') {
            cy.get(this.passwordInput).type(password)
            cy.get(this.submitButton).click()
        } else {
            cy.get(this.emailInput).type(username)
            cy.get(this.passwordInput).type(password)
            cy.get(this.submitButton).click()
        }
    }
}
export default new Authentication()
