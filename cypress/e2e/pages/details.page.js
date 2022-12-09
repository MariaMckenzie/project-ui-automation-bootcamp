
/**
* Contains the locators and selectors found on the product page. 
*/

class Product {

    /**
     * @returns the title of the product section of the page
     */
    get title () { return (".css-16xlhis > :nth-child(2) > .chakra-heading") }


    /**
     * @returns the products section of the page
     */
    get signupSection () { return (".css-16xlhis > :nth-child(2)") }


    /**
     * @returns the button to signup or register
     */
    get signInOrRegisterButton () { return (".css-12qzrsi > :nth-child(1)") }
    

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
     * Adds an item to cart
     * @param {Number} itemNo nth item in the list
     */
     addToCart (itemNo) {
        cy.get(`css-12qzrsi > : nth-child(${itemNo}) button`).click()
    }

    /**
     * Adds an item to cart
     * @param {Number} itemNo nth item in the list
     */
    getProductName (itemNo) {
        cy.get(`css-12qzrsi > : nth-child(${itemNo}) button`).click()
    }

}
export default new Product()
