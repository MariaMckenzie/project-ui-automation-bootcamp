
/**
* Contains the locators and selectors found on the cart page. 
*/

class Cart {

    /**
     * @returns the selector for the title of the cart
     */
    get title () { return (".snipcart-cart-header__title") }


    /**
     * @returns the selector for the first product card (the last product added)
     */
    get firstProductCard () { return (".snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow > li:nth-child(1) > div > div") }


    /**
     * @returns the selector for the product list
     */
    get productsList () { return (".snipcart-item-list.snipcart-scrollbar.snipcart-item-list--no-shadow") }


    /**
     * @returns the selector for the product name
     */
    get productName () { return (".snipcart-item-line__title") }


    /**
     * @returns the selector for the product price
     */
    get productPrice () { return (".snipcart-item-quantity__total-price") }


    /**
     * @returns the selector for the product quantity
     */
    get productQuantity () { return (".snipcart-item-quantity__quantity") }


    /**
     * @returns the selector for the button that closes the cart
     */
    get backToHomeButton () { return (".snipcart-cart-header__close-button") }


    /**
     * @returns the selector for the subtotal of all products in the cart
     */
    get cartTotal () { return (".snipcart-summary-fees__amount") }


    /**
     * @returns the selector for the button that decrements the product quantity
     */
    get decrementQuantity () { return ("button[title='Decrement quantity']") }


    /**
     * @returns the selector for the button that increments the product quantity
     */
    get incrementQuantity () { return ("button[title='Increment quantity']") }
    
    
    /**
    * @returns the selector for the button to remove a product
    */
   get removeButton () { return ("button[title='Remove item']") }


   /**
    * @returns the selector for the number of products in the cart
    */
   get totalProducts () { return (".snipcart-cart-header__option.snipcart-cart-header__count.snipcart__font--secondary.snipcart__font--bold") }

   
   /**
    * @returns the selector for the checkout button
    */
   get checkoutButton () { return (".snipcart-button-primary.snipcart-base-button.is-icon-right") }



    // METHODS

    /**
     * Closes the cart snippet
     */
    closeCart () {
        cy.get(this.backToHomeButton).click()
    }
    
    
    /**
     * Returns the nth product card 
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @returns the nth product card
     */
    getProductCard (itemNo) {
        return (`${this.productsList} > li:nth-child(${itemNo})`)  //TO BE FIXED
    }


    /**
     * Returns the name, price and quantity of the nth product  
     * @param {Number} itemNo nth item in the list
     * @returns a list of selectors for the product name, price and quantity
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
        return (`${itemNo}`)
    }

}
export default new Cart()
