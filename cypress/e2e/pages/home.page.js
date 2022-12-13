
/**
* Contains the locators and selectors found on the home/landing page. 
*/

class Home {
    
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
     * @returns the selector for the title of the products section of the page
     */
    get title () { return (".chakra-heading.css-1jhlc8u") }


    /**
     * @returns the selector for the first product card
     */
    get firstProductCard () { return ("#product-0") }


    /**
     * @returns the selector for the product quantity input field
     */
    get productQuantity () { return ("input") }


    /**
     * @returns the selector for the product name
     */
    get productName () { return (".css-1oeb4ru") }


    /**
     * @returns the selector for the product image
     */
    get productImage () { return (".css-5ge9zd > .chakra-aspect-ratio") }


    /**
     * @returns the selector for the product price
     */
    get productPrice () { return (".css-0") }


    /**
     * @returns the selector for the add-to-cart button
     */
    get addToCartButton () { return ("#add-to-cart") }


    /**
     * @returns the selector for the searchbar
     */
    get searchBar () { return ("#search") }


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
     * Go to the nth product details page
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     */
    goToProductDetailsPage (itemNo) {
        cy.get(`#product-${itemNo-1} > ${this.productImage}`).click()
    }


    /**
     * Adds the nth item to favourites
     * @param {Number} itemNo nth item in the list
     */
    addToFavourites (itemNo) {
        cy.get(`#product-${itemNo-1} > ${this.productImage}`).click()
    }


    /**
     * Returns the name and price of the nth product 
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @returns a list containing the product name and price
     */
    getProductCardData (itemNo) {
        return ([`#product-${itemNo-1} ${this.productName}`, `#product-${itemNo-1} ${this.productPrice}`])
    }
    

    /**
     * Add nth product to cart
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @param {Number} quantity number of products required
     * @returns a list containing the product name and price
     */
    addToCart (itemNo, quantity) {
        if (quantity !== "" ||  isNaN(quantity) == false) {
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).clear()
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).type(quantity)
            cy.get(`#product-${itemNo-1} ${this.addToCartButton}`).click()
        }
        else {
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).clear()
            cy.get(`#product-${itemNo-1} ${this.addToCartButton}`).click()
        }
    }

    
    /**
     * Modify the nth product to cart
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @param {Number} quantity number of products required
     * @returns a list containing the product name and price
     */
    modifyQuantity (itemNo, quantity) {
        if (quantity !== "" ||  isNaN(quantity) == false) {
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).clear()
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).type(quantity)
        }
        else {
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).clear()
        }
    }


    /**
     * Search for product
     * @param {String} key keyword for search
     * @returns a list containing the product name and price
     */
    search (key) {
        cy.get(this.searchBar).clear()
        cy.get(this.searchBar).type(key)
    }

}
export default new Home()
