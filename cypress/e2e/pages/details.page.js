
/**
* Contains the locators and selectors found on the product details page. 
*/

class Details {

    /**
     * @returns the input field for the product quantity
     */
    get productQuantity () { return (".chakra-numberinput__field") }


    /**
     * @returns the product name
     */
    get productName () { return (".css-84zodg .css-1dklj6k") }


    /**
     * @returns the product price
     */
    get productPrice () { return (".css-84zodg > p:nth-child(2)") }


    /**
     * @returns the product description
     */
    get productDescription () { return (".css-egoftb > p") }
    

    /**
     * @returns the product image
     */
    get productImage () { return ("li[class='slide selected previous'] div") }


    /**
     * @returns the product category
     */
    get productCategory () { return ("div[class='chakra-stack css-egoftb'] span[class='css-1ccau2i']") }


    /**
     * @returns the button that returns the user to the home ppage
     */
    get backButton () { return (".chakra-heading.css-18j379d") }


    /**
     * @returns the add-to-cart button
     */
    get addToCartButton () { return ("#add-to-cart") }

     

    // METHODS

    /**
     * Add product to cart
     * @param {Number} quantity number of products required
     * @returns a list containing the product name and price
     */
    addToCart (quantity) {
        cy.get(this.productQuantity).clear()
        cy.get(this.productQuantity).type(quantity)
        cy.get(this.addToCartButton).click()
    }

}
export default new Details()
