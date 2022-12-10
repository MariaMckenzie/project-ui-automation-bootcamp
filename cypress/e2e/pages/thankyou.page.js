
/**
* Contains the locators and selectors found on the Thank you page. 
*/

class ThankYou {

    /**
     * @returns the order details
     */
    get orderDetails () { return (".snipcart-order__details") }


    /**
     * @returns the title of the page
     */
    get title () { return ("div[class='snipcart__box--title'] div h1[class='snipcart__font--subtitle']") }


    /**
     * @returns the button to return user to home page
     */
    get continueShoppingButton() { return (".snipcart-modal__close-title.snipcart__font--std") }


    /**
     * @returns the subtotal before tax
     */
    get subTotal() { return ("span[class='snipcart-summary-fees__amount']") }


    /**
     * @returns the customer's billing information
     */
    get customerInformation () { return (".snipcart-checkout-step__col:nth-child(1) > div > span")}


    /**
     * @returns the invoice number
     */
    get invoiceNumber () { return (".snipcart-order__invoice-number--highlight.snipcart__font--black.snipcart__font--secondary")}

}
export default new ThankYou()
