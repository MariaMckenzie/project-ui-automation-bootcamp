
/**
* Contains the locators and selectors found on the Checkout page. 
*/

class Cart {

    /**
     * @returns the title of the page
     */
    get title () { return (".snipcart__font--subtitle") }


    /**
     * @returns the input field for name
     */
    get nameInput () { return ("input[name='name']") }


    /**
     * @returns the input field for email
     */
    get emailInput () { return ("input[name='email']") }


    /**
     * @returns the input field for address 1
     */
    get address1Input () { return ("input[name='address1']") }


    /**
     * @returns the input field for city
     */
    get cityInput () { return ("input[name='city']") }

    
    /**
     * @returns the input field for country
     */
    get countryInput () { return ("div[class='snipcart-form__field'] div[class='snipcart-textbox snipcart__font--bold snipcart__font--secondary snipcart-form__select'] input") }


    /**
     * @returns the input field for state
     */
    get stateInput () { return ("div[class='snipcart-form__field snipcart-form__cell--large'] div[class='snipcart-typeahead'] div[class='snipcart-textbox snipcart__font--bold snipcart__font--secondary snipcart-form__select'] input") }


    /**
     * @returns the input field for postal/zip code
     */
    get postalCodeInput () { return ("input[name='postalCode']") }


    /**
     * @returns the button to proceed to the next step of checkout process
     */
    get continueButton() { return ("button[type='submit']") }


    /**
     * @returns the missing email error
     */
    get emailError() { return ("div[data-for='email']") }


    /**
     * @returns the missing city error
     */
    get cityError() { return ("div[data-for='city']") }


    // METHODS

    /**
     * Fills billing information
     * @param {String} name name of user
     * @param {String} email email of user
     * @param {String[]} addr address - [address line 1, city, state, country, postal code]
     */
    addBillingInformation (name, email, addr) {
        cy.get(this.nameInput).type(name)
        cy.get(this.emailInput).type(email)
        cy.get(this.address1Input).type(addr[0])
        cy.get(this.cityInput).type(addr[1])
        cy.get(this.stateInput).type(addr[2])
        cy.get(this.countryInput).type(addr[3])
        cy.get(this.postalCodeInput).type(addr[4])

        cy.get(this.continueButton).click()
    }
    


}
export default new Cart()
