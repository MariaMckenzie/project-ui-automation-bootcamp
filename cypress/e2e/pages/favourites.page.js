
/**
* Contains the locators and selectors found on the favourites page. 
*/

class Favourites {
    
    /**
     * @returns the selector for the navigation bar
     */
    get navBar () { return (".css-1lv9dyw") }


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
     * @returns the selector for the button linked to the favourites page
     */
    get favouritesButton () { return ("#top-favorite") }


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
     * @returns the selector for the title of the page
     */
    get title () { return (".chakra-heading.css-11cq7yk") }


    /**
     * @returns the selector for the first product card in favourites
     */
    get firstProductCard () { return (".chakra-stack.css-uaqjf:first-child") }


    /**
     * @returns the selector for the favourites icon on each product card that adds a product to favourites
     */
    get addToFavouritesIcon () { return ("#add-to-favorite") }


    /**
     * @returns the selector for the favourites icon on each product card that removes a product from favourites
     */
    get removeFromFavouritesIcon () { return ("#remove-from-favorite") }


    /**
     * @returns the selector for a product card in favourites
     */
    get productCard () { return (".chakra-stack.css-uaqjf") }


    /**
     * @returns the selector for the product quantity input field
     */
    get productQuantity () { return ("input") }


    /**
     * @returns the selector for the product name
     */
    get productName () { return (".chakra-text.css-1n64n71") }


    /**
     * @returns the selector for the product image
     */
    get productImage () { return (".chakra-image.css-2i84d9") }


    /**
     * @returns the selector for the product price
     */
    get productPrice () { return (".chakra-text.css-0") }


    /**
     * @returns the selector for the product category
     */
    get addToCartButton () { return (".css-1ccau2i") }


    /**
     * @returns the selector for the add-to-cart button
     */
    get addToCartButton () { return ("#add-to-cart") }


    /**
     * @returns the selector for the remove-from-favourites button
     */
    get removeFromFavouritesButton () { return ("#remove-favorite-btn") }


    /**
     * @returns the selector for the text when the favourites list is empty
     */
    get emptyListText () { return (".chakra-stack.css-owjkmg > h2") }

    
    /**
     * @returns the selector for the toast that confirms when the product is added/removed from favourites
     */
    get toast () { return ("#toast") }



    // METHODS
    
    /**
     * @returns the selector for the  toast that confirms when the product is added/removed from favourites
     */
    getToast (count) { 
        return (`${this.toast}-${count}`) 
    }
    

    /**
     * @returns the selector for the nth product card
     * @param {Number} itemNo nth item in the list
     */
    getProductCard (itemNo) { 
        return (`${this.productCard}:nth-child(${itemNo})`) 
    }


    /**
     * Add nth product to favourites
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     */
    addToFavourites (itemNo) {
        cy.get(`#product-${itemNo-1} ${this.addToFavouritesIcon}`).click()
    }
    

    /**
     * Removes the nth product from favourites
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     */
    removeFromFavourites (itemNo) {
        cy.get(`#product-${itemNo-1} ${this.removeFromFavouritesIcon}`).click()
    }
    

    /**
     * Add nth product to cart
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @param {Number} quantity number of products required
     */
    addToCart (itemNo, quantity) {
        if (quantity !== "") {
            cy.get(`${this.productCard}:${itemNo} ${this.productQuantity}`).clear()
            cy.get(`${this.productCard}:${itemNo} ${this.productQuantity}`).type(quantity)
            cy.get(`${this.productCard}:${itemNo} ${this.addToCartButton}`).click()
        }
        else {
            cy.get(`${this.productCard}:${itemNo} ${this.productQuantity}`).clear()
            cy.get(`${this.productCard}:${itemNo} ${this.addToCartButton}`).click()
        }
    }

    
    /**
     * Modify the nth product to cart
     * **(Note: The maximum number of products is 22)**
     * @param {Number} itemNo nth item in the list
     * @param {Number} quantity number of products required
     */
    modifyQuantity (itemNo, quantity) {
        if (quantity !== "" ||  isNaN(quantity) == true) {
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).clear()
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).type(quantity)
        }
        else {
            cy.get(`#product-${itemNo-1} ${this.productQuantity}`).clear()
        }
    }

}
export default new Favourites()
