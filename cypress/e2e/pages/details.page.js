
/**
* Contains the locators and selectors found on the product details page. 
*/

class Details {
    
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
     * @returns the selector for the button that returns the user to the home page
     */
    get backButton () { return (".chakra-heading.css-18j379d") }


    /**
     * @returns the selector for the product image
     */
    get productImage () { return ("li[class='slide selected previous'] div img") }
    

    /**
     * @returns the selector for the product name
     */
    get productName () { return (".css-84zodg .css-1dklj6k") }
    

    /**
     * @returns the selector for the product description
     */
    get productDescription () { return (".css-egoftb > p") }


    /**
     * @returns the selector for the product price
     */
    get productPrice () { return (".css-84zodg > p:nth-child(2)") }

    /**
     * @returns the selector for the product quantity input field
     */
    get productQuantity () { return (".chakra-numberinput__field") }


    /**
     * @returns the selector for the product category
     */
    get productCategory () { return ("div[class='chakra-stack css-egoftb'] span[class='css-1ccau2i']") }

    
    /**
     * @returns the selector for the add-to-cart button
     */
    get addToCartButton () { return ("#add-to-cart") }

     

    // METHODS

    /**
     * Add product to cart
     * @param {Number} quantity number of products required
     */
    addToCart (quantity) {
        cy.get(this.productQuantity).clear()
        cy.get(this.productQuantity).type(quantity)
        cy.get(this.addToCartButton).click()
    }

    
    /**
     * Modify the product quantity
     * @param {Number} quantity number of products required
     */
    modifyQuantity (quantity) {
        if (quantity === "" ||  isNaN(quantity)) {
            cy.get(this.productQuantity).clear()
        }
        else {
            cy.get(this.productQuantity).clear()
            cy.get(this.productQuantity).type(quantity)
        }
    }

}
export default new Details()
