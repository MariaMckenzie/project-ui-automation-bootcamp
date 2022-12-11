
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
     * @returns the empty cart error
     */
    get emptyCartError () { return (".snipcart-empty-cart__title") }


    /**
     * @returns the button that takes the user back to the cart
     */
    get backToHomeButton () { return (".snipcart-modal__close-title") }


    /**
     * @returns the subtotal of all products in the cart
     */
    get cartTotal () { return (".snipcart-summary-fees__amount") }



    // METHODS

    /**
     * Closes the cart snippet
     */
    closeCart () {
        cy.get(this.backToHomeButton).click()
    }
    
    
    /**
     * Retruns the nth product card 
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @returns the nth product card
     */
    getProductCard (itemNo) {
        return (`${itemNo}`)
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

    /**
     * Adds commas to large numbers to seperate it in thousands
     * @param {*} num a number
     * @returns 
     */
    numberWithCommas(num) {
        if (num > 1000) {
            return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        }
        return num
    }

}
export default new Cart()
