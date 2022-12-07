
/**
* Contains the locators and selectors found on the login page. 
*/

class Authentication {

    /**
     * @returns the button to signup or register
     */
    get signInOrRegisterButton () { return ("#signInOrRegister") } 
    

    /**
     * @returns the input field for the username
     */
     get usernameInput () { return ("#user-name") } 
    

    /**
     * @returns the input field for the password
     */
    get passwordInput () { return ("#password") }

    
    /**
     * @returns the button to log in
     */
    get loginButton () { return ("#login-button") }

     
    /**
     * @returns the error message
     */
    get loginError () { return ("h3[data-test='error']") }


    // METHODS

    /**
     * Logs in the user
     * @param {String} username
     * @param {String} password
     */
    login (username, password) { 
        if (username === '' & password === '') {
            cy.get(this.loginButton).click()
        } else if (password === '') {
            cy.get(this.usernameInput).type(username)
            cy.get(this.loginButton).click()
        } else if (username === '') {
            cy.get(this.passwordInput).type(password)
            cy.get(this.loginButton).click()
        } else {
            cy.get(this.usernameInput).type(username)
            cy.get(this.passwordInput).type(password)
            cy.get(this.loginButton).click()
        }
    }
}
export default new Authentication()
