import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"


describe("Add-to-cart (09 - 13)", () => {
    // variables
    let total

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit("/")

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)

        // assert that the user is logged in
        cy.get(homePage.title)
            .should("contain", "Products")
        cy.get(homePage.firstProductCard)
            .should("be.visible")

        // wait for the page to load
        cy.wait(2000)
    })
  
    /**
     * Test Case ID: E2E_9
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add a product to the cart from the home page", () => {
        // add product to cart
        homePage.addToCart(productData.product1.number, productData.product1.quantity)
        cy.wait(1000)

        // in the event that cypress did not load the cart automatically
        if (cy.get(homePage.firstProductCard).should("be.visible")) {
            cy.get(homePage.cartButton).click( {force:true} ) // element is being covered by the cart that was supposed to be visible
        }

        // calculate total
        total = productData.product1.price * productData.product1.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product1.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product1.quantity * productData.product1.price)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product1.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total
    })

    /**
     * Test Case ID: E2E_10
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add multiple of the same product to cart", () => {
        // add product to cart
        homePage.addToCart(productData.product19.number, productData.product19.quantity)

        // calculate total
        total = productData.product19.price * productData.product19.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product19.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product19.quantity * productData.product19.price)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product19.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${cartPage.numberWithCommas(total)}.00`) // check total

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${productData.product19.quantity * productData.product19.price}.00`) // check price
    })
    
    /**
     * Test Case ID: E2E_11
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add multiple products to the cart from the product details page", () => {
        // add multiple products to cart
        homePage.addToCart(productData.product1.number, productData.product1.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(productData.product2.number, productData.product2.quantity)
        cy.wait(1000)
        cartPage.closeCart()
        homePage.addToCart(productData.product6.number, productData.product6.quantity)

        // calculate total
        total = (productData.product1.price * productData.product1.quantity) + (productData.product2.price * productData.product2.quantity) + (productData.product6.price * productData.product6.quantity)

        // wait for the page to load
        cy.wait(2000)

        // assert that the products are in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")

        // product 1
        cy.get(cartPage.getProductCardData(3)[0])
            .should("contain", productData.product1.name) // check product name
        cy.get(cartPage.getProductCardData(3)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product1.price * productData.product1.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(3)[2])
            .should("have.text", `${productData.product1.quantity}`) // check product quantity
        // product 2
        cy.get(cartPage.getProductCardData(2)[0])
            .should("contain", productData.product2.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product2.price * productData.product2.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(2)[2])
            .should("have.text", `${productData.product2.quantity}`) // check product quantity
        // product 3
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product6.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product6.price * productData.product6.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product6.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${cartPage.numberWithCommas(total)}.00`) // check total
    })
    
    /**
     * Test Case ID: E2E_12
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add an item to cart from the product details page", () => {
        // select product and visit product details page 
        homePage.goToProductDetailsPage(productData.product1.number)
        cy.wait(1000)

        // assert that the user is on the product information page
        cy.url()
            .should("contain", "quality-hat")
        cy.get(detailsPage.productName)
            .should("contain", productData.product1.name)
        cy.get(detailsPage.productDescription)
            .should("contain", productData.product1.desc)
        cy.get(detailsPage.productPrice)
            .should("contain", `$${productData.product1.price}`)

        // add product to cart
        detailsPage.addToCart(productData.product1.quantity)

        cy.wait(2000)

        // calculate total
        total = productData.product1.price * productData.product1.quantity

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product1.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${productData.product1.quantity * productData.product1.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product1.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total    
    })
    
    /**
     * Test Case ID: E2E_13
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add add one item to cart from the product details page and add the same item again from the product details page", () => {
        //  add product to cart
        homePage.addToCart(productData.product5.number, productData.product5.quantity)
        
        // calculate total
        total = productData.product5.price * productData.product5.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product5.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${productData.product5.quantity * productData.product5.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product5.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${productData.product5.quantity * productData.product5.price}.00`) // check price

        // select product and visit product details page 
        homePage.goToProductDetailsPage(5)

        // wait for the page to load
        cy.wait(2000)

        // assert that the user is on the product information page
        cy.url()
            .should("contain", "quality-pillow")
        cy.get(detailsPage.productName)
            .should("contain", productData.product5.name)
        cy.get(detailsPage.productPrice)
            .should("contain", `$${productData.product5.price}`)

        // add the product to cart again
        detailsPage.addToCart(productData.product5.quantity)

        // calculate total
        total = (productData.product5.quantity * productData.product5.price)*2

        // aasert that the item is added again to the cart
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product5.quantity * 2}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total
    })

})
