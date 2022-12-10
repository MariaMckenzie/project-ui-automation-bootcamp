
/**
* Contains the locators and selectors found on the Cart/landing page. 
*/

class Cart {

    /**
     * @returns the title of the cart
     */
    get title () { return (".snipcart-cart-header__title") }


    /**
     * @returns the first product card (the last product added)
     */
    get firstProductCard () { return (".snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow > li:nth-child(1) > div > div") }


    /**
     * @returns the input field for the product quantity
     */
    get productsList () { return (".snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow") }


    /**
     * @returns the product name
     */
    get productName () { return (".snipcart-item-line__title") }


    /**
     * @returns the product price
     */
    get productPrice () { return (".snipcart-item-quantity__total-price") }


    /**
     * @returns the product quantity
     */
    get productQuantity () { return (".snipcart-item-quantity__quantity") }


    /**
     * @returns the button that decrements the product quantity
     */
    get decrementQuantity () { return ("button[title='Decrement quantity']") }


    /**
     * @returns the button that increments the product quantity
     */
    get incrementQuantity () { return ("button[title='Increment quantity']") }


    /**
     * @returns the button that takes the user back to the cart
     */
    get backToHomeButton () { return (".snipcart-modal__close-title") }


    /**
     * @returns the subtotal of all products in the cart
     */
    get cartTotal () { return (".snipcart-summary-fees__amount") }


    /**
     * @returns the button to remove a product
     */
    get removeButton () { return ("button[title='Remove item']") }


    /**
     * @returns the number of products in the cart
     */
    get totalProducts () { return (".snipcart-cart-header__option.snipcart-cart-header__count.snipcart__font--secondary.snipcart__font--bold") }



    // METHODS

    /**
     * Closes the cart snippet
     */
    closeCart () {
        cy.get(this.backToHomeButton).click()
    }
    
    
    /**
     * Retruns the nth product card 
     * @param {Number} itemNo nth item in the list
     * @returns the nth product card
     */
    getProductCard (itemNo) {
        return (`.snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow > li:nth-child(${itemNo}) > div > div`)
    }

    
    /**
     * Removes  the nth product card 
     * @param {Number} itemNo nth item in the list
     */
    removeProductFromCart (itemNo) {
        cy.get(`.snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow > li:nth-child(${itemNo}) > div > div ${this.removeButton}`).click()
    }

    
    /**
     * Decrements the product quantity
     * @param {Number} itemNo nth item in the list
     */
    decrementProductQuantity (itemNo) {
        cy.get(`.snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow > li:nth-child(${itemNo}) > div > div ${this.decrementQuantity}`).click()
    }

    
    /**
     * Increments the product quantity
     * @param {Number} itemNo nth item in the list
     */
    incrementProductQuantity (itemNo) {
        cy.get(`.snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow > li:nth-child(${itemNo}) > div > div ${this.incrementQuantity}`).click()
    }


    /**
     * Returns the name and price of the nth product  
     * @param {Number} itemNo nth item in the list
     * @returns a list containing the product name, price and quantity
     */
    getProductCardData (itemNo) {
        return (
            [`${this.productsList} > li:nth-child(${itemNo}) > div > div ${this.productName}`, 
                `${this.productsList} > li:nth-child(${itemNo}) > div > div ${this.productPrice}`,
                `${this.productsList} > li:nth-child(${itemNo}) > div > div ${this.productQuantity}`
            ])
    }

}
export default new Cart()
