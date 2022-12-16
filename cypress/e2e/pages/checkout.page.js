
/**
* Contains the locators and selectors found on the checkout page. 
*/

class Checkout {

    /**
     * @returns the selector for the title of the page
     */
    get title () { return (".snipcart__font--subtitle") }


    /**
     * @returns the selector for the input field for name
     */
    get nameInput () { return ("input[name='name']") }


    /**
     * @returns the selector for the input field for email
     */
    get emailInput () { return ("input[name='email']") }


    /**
     * @returns the selector for the input field for address 1
     */
    get address1Input () { return ("input[name='address1']") }


    /**
     * @returns the selector for the input field for city
     */
    get cityInput () { return ("input[name='city']") }

    
    /**
     * @returns the selector for the input field for country
     */
    get countryInput () { return ("select[name='country']") }


    /**
     * @returns the selector for the input field for state
     */
    get stateInput () { return ("input[name='province']") }


    /**
     * @returns the selector for the input field for postal/zip code
     */
    get postalCodeInput () { return ("input[name='postalCode']") }


    /**
     * @returns the selector for the button to proceed to the next step of checkout process
     */
    get continueButton() { return ("button[type='submit']") }


    /**
     * @returns the selector for the missing country error
     */
    get countryError() { return ("div[data-for='country']") }


    /**
     * @returns the selector for the missing city error
     */
    get cityError() { return ("div[data-for='city']") }


    /**
     * @returns the selector for the cart summary
     */
    get cartSummary() { return (".snipcart-cart-summary__content") }


    /**
     * @returns the selector for the cart summary title
     */
    get cartSummaryTitle() { return (".snipcart-cart-summary__title") }


    /**
     * @returns the selector for the cart summary dropdown
     */
    get cartSummaryDropdown() { return (".snipcart-modal__header-summary-title.snipcart__font--large.snipcart__font--secondary.snipcart__font--bold") }


    /**
     * @returns the selector for the cart summary list
     */
    get cartSummaryList() { return (".snipcart-cart-summary-items-list") }


    /**
     * @returns the selector for the cart summary total
     */
    get cartSummaryTotal() { return (".snipcart-summary-fees__amount") }
    
    
    /**
     * @returns the selector for the cart summary total
     */
    get cartTotal() { return (".snipcart-modal__header-summary-title > span") }




    // PAYMENTS 

    /**
     * @returns the selector for the payment card
     */
    get paymentCard() { return (".snipcart-form.snipcart-payment.snipcart__box") }


    /**
     * @returns the selector for the payments title
     */
    get paymentTitle() { return (".snipcart-payment__header.snipcart__font--subtitle") }


    /**
     * @returns the selector for the input field for card number
     */
    get cardNumberInput() { return ("#card-number") }


    /**
     * @returns the selector for the input field for card expiry date
     */
    get expiryDateInput() { return ("#expiry-date") }


    /**
     * @returns the selector for the input field for
     */
    get cvvInput() { return ("#cvv") }


    /**
     * @returns the selector for the button to place the order and complete the checkout process
     */
    get placeOrderButton() { return ("button[type='submit']") }


    /**
     * @returns the selector for the button to edit billing information
     */
    get editBillingButton() { return (".snipcart-button-link") }


    /**
     * @returns the selector for the billing information details
     */
    get billingInfo () { return (":nth-child(1) > :nth-child(2) > .snipcart-billing-completed__information") }


    /**
     * @returns the selector for the subtotal before tax
     */
    get subTotal() { return ("span[class='snipcart-summary-fees__amount']") }


    /**
     * @returns the selector for the customer's billing information
     */
    get customerInformation () { return (".snipcart-checkout-step__col:nth-child(1) > div > span")}


    /**
     * @returns the selector for the button that takes the user back to home
     */
    get backToHomeButton () { return (".snipcart-cart-header__close-button.snipcart-modal__close") }



    // METHODS

    /**
     * Fills billing information
     * @param {String} name name of user
     * @param {String} email email of user
     * @param {String[]} addr address - [address line 1, city, state, country, postal code]
     */
    addBillingInformation (name, email, addr) {
        if (name !== "")  {
            cy.get(this.nameInput).type(name)
        }

        if (email !== "")  {
            cy.get(this.emailInput).type(email)
        }

        if (addr[0] !== "") {
            cy.get(this.address1Input).type(addr[0])
        }

        if (addr[1] !== "") {
            cy.get(this.cityInput).type(addr[1])
        }

        if (addr[2] !== "") {
            cy.get(this.countryInput).select(addr[3])
        }

        if (addr[3] !== "") {
            cy.get(this.stateInput).type(addr[2])
        }

        if (addr[4] !== "") {
            cy.get(this.postalCodeInput).type(addr[4])
        }
   
        cy.get(this.continueButton).click({force: true})
    }
    

    /**
     * Fills card information
     * @param {Number} cardNumber card number
     * @param {Number} expiryDate card expiry date
     * @param {Number} cvv card cvv
     */
    addCardInformation (cardNumber, expiryDate, cvv) {
        if (cardNumber === "") {
            cy.get(".snipcart-payment-card-form > iframe")
                .its("0.contentDocument.body")
                .then(cy.wrap)
                .find(this.cardNumberInput).clear()
        } else {
            cy.get(".snipcart-payment-card-form > iframe")
                .its("0.contentDocument.body")
                .then(cy.wrap)
                .find(this.cardNumberInput).type(cardNumber)
        }

        if (expiryDate === "") {
            cy.get(".snipcart-payment-card-form > iframe")
                .its("0.contentDocument.body")
                .then(cy.wrap)
                .find(this.expiryDateInput).clear()
        } else {
            // // check for valid card date
            // let today, someday, isValid;
            // let expMonth =Number(`${expiryDate}`.substring(0,2));
            // let expYear = Number(`20${expiryDate}`.substring(2,4));

            // today = new Date();
            // someday = new Date();
            // someday.setFullYear(expYear, expMonth, 1);

            // if (someday < today) {
            //     isValid = false;
            // } else {
            //     isValid = true;
            // }

            // if (isValid === true) {
            //     cy.get(this.expiryDateInput).type(expiryDate)
            // }
            // else {
            //     cy.get(this.expiryDateInput).clear()
            // }

            cy.get(".snipcart-payment-card-form > iframe")
                .its("0.contentDocument.body")
                .then(cy.wrap)
                .find(this.expiryDateInput).type(expiryDate)
        }

        if (cvv === "") {
            cy.get(".snipcart-payment-card-form > iframe")
                .its("0.contentDocument.body")
                .then(cy.wrap)
                .find(this.cvvInput).type(cvv).clear()
        } else {
            cy.get(".snipcart-payment-card-form > iframe")
                .its("0.contentDocument.body")
                .then(cy.wrap)
                .find(this.cvvInput).type(cvv)
        }

        cy.get(this.placeOrderButton).click()
    }


/**
 * Returns a list of selectors with the name, quantity and price for products in the cart summary
 * @param {Number} itemNo 
 * @returns a list of selectors containing the product name, quantity and price
 */
    getCartSummaryInformation (itemNo) {
        return ([`${this.cartSummaryList} li:nth-child(${itemNo}) .snipcart-cart-summary-item__name`,
            `${this.cartSummaryList} li:nth-child(${itemNo}) > .snipcart-cart-summary-item__quantity`,
            `${this.cartSummaryList} li:nth-child(${itemNo}) > .snipcart-cart-summary-item__price`
        ])
    }

}
export default new Checkout()
