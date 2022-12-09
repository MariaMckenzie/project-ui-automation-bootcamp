
/**
* Contains the locators and selectors found on the home/landing page. 
*/

class Home {

    /**
     * @returns the button that logs out the user
     */
    get logoutButton () { return ("#top-sign-out") }


    /**
     * @returns the button that displays the cart
     */
    get cartButton () { return ("#top-cart") }


    /**
     * @returns the button that takes the user to the contact page
     */
    get contactButton () { return ("#top-contact") }


    /**
     * @returns the title of the products section of the page
     */
    get title () { return (".chakra-heading.css-1jhlc8u") }


    /**
     * @returns the first product card
     */
    get firstProductCard () { return ("#product-0") }


    /**
     * @returns the input field for the product quantity
     */
    get productQuantity () { return (".css-a8qclj") }


    /**
     * @returns the product name
     */
    get productName () { return (".css-1n64n71j") }


    /**
     * @returns the product price
     */
    get productPrice () { return (".css-0") }



    // METHODS

    /**
     * Retruns the nth product card 
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @returns the nth product card
     */
    getProductCard (itemNo) {
        return (`#product-${itemNo-1}`)
    }


    /**
     * Returns the name and price of the nth product card 
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @returns a list containing the product name and price
     */
    getProductCardData (itemNo) {
        return ([`#product-${itemNo-1} ${this.productName}`, `#product-${itemNo-1} ${this.productPrice}`])
    }


    /**
     * Sets the quantity of the product
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @param {Number} quantity number of products required
     * @returns a list containing the product name and price
     */
    getProductCardData (itemNo, quantity) {
        cy.get(`#product-${itemNo-1} ${this.productQuantity}`).type(quantity)
    }

}
export default new Home()
