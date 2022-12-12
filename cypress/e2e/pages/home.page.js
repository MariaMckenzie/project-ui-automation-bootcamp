
/**
* Contains the locators and selectors found on the home/landing page. 
*/

class Home {

    /**
     * @returns the store name
     */
    get storeName () { return (".chakra-heading.css-kmq9po") }


    /**
     * @returns the image with store logo
     */
    get storeImage () { return (".chakra-image.css-0") }


    /**
     * @returns the navigation bar
     */
    get navBar () { return ("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)") }


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

}
export default new Home()
