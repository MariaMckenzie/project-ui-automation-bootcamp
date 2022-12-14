import { product1, product13, product18, product19, product2, product3, product5, product6 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"


describe("Add-to-cart", () => {
    // variables
    let total

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit("/")

        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)

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
    it("should verify that the user can add a product to the cart from the product details page", () => {
        // add product to cart
        homePage.addToCart(1, product1.quantity)

        // calculate total
        total = product1.price * product1.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product1.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(product1.quantity * product1.price)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product1.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${cartPage.numberWithCommas(total)}.00`) // check price
    })

    /**
     * Test Case ID: E2E_10
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add multiple of the same product to cart", () => {
        // add product to cart
        homePage.addToCart(19, product19.quantity)

        // calculate total
        total = product19.price * product19.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product19.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(product19.quantity * product19.price)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product19.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${cartPage.numberWithCommas(total)}.00`) // check total

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${product19.quantity * product19.price}.00`) // check price
    })
    
    /**
     * Test Case ID: E2E_11
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add multiple products to the cart from the product details page", () => {
        // add multiple products to cart
        homePage.addToCart(1, product1.quantity)
        cy.wait(500)
        cartPage.closeCart()
        homePage.addToCart(2, product2.quantity)
        cy.wait(500)
        cartPage.closeCart()
        homePage.addToCart(6, product6.quantity)

        // calculate total
        total = (product1.price * product1.quantity) + (product2.price * product2.quantity) + (product6.price * product6.quantity)

        // wait for the page to load
        cy.wait(2000)

        // assert that the products are in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")

        // product 1
        cy.get(cartPage.getProductCardData(3)[0])
            .should("contain", product1.name) // check product name
        cy.get(cartPage.getProductCardData(3)[1])
            .should("contain", `$${cartPage.numberWithCommas(product1.price * product1.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(3)[2])
            .should("have.text", `${product1.quantity}`) // check product quantity
        // product 2
        cy.get(cartPage.getProductCardData(2)[0])
            .should("contain", product2.name) // check product name
        cy.get(cartPage.getProductCardData(2)[1])
            .should("contain", `$${cartPage.numberWithCommas(product2.price * product2.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(2)[2])
            .should("have.text", `${product2.quantity}`) // check product quantity
        // product 3
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product6.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(product6.price * product6.quantity)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product6.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${cartPage.numberWithCommas(total)}.00`) // check total
    })
    
    /**
     * Test Case ID: E2E_12
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add an item to cart from the product details page", () => {
        // select product and visit product details page 
        homePage.goToProductDetailsPage(1)
        cy.wait(500)

        // assert that the user is on the product information page
        cy.url()
            .should("contain", "quality-hat")
        cy.get(detailsPage.productName)
            .should("contain", product1.name)
        cy.get(detailsPage.productDescription)
            .should("contain", product1.desc)
        cy.get(detailsPage.productPrice)
            .should("contain", `$${product1.price}`)

        // add product to cart
        detailsPage.addToCart(product1.quantity)

        cy.wait(2000)

        // calculate total
        total = product1.price * product1.quantity

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product1.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${product1.quantity * product1.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product1.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total    
    })
    
    /**
     * Test Case ID: E2E_13
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can add add one item to cart from the product details page and add the same item again from the product details page", () => {
        //  add product to cart
        homePage.addToCart(5, product5.quantity)
        
        // calculate total
        total = product5.price * product5.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product5.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${product5.quantity * product5.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product5.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total

        // close cart and check the price displayed on home page
        cartPage.closeCart()
        cy.get(homePage.cartButton)
            .should("have.text", `$${product5.quantity * product5.price}.00`) // check price

        // select product and visit product details page 
        homePage.goToProductDetailsPage(5)

        // wait for the page to load
        cy.wait(500)

        // assert that the user is on the product information page
        cy.url()
            .should("contain", "quality-pillow")
        cy.get(detailsPage.productName)
            .should("contain", product5.name)
        cy.get(detailsPage.productPrice)
            .should("contain", `$${product5.price}`)

        // add the product to cart again
        detailsPage.addToCart(product5.quantity)

        // calculate total
        total = (product5.quantity * product5.price)*2

        // aasert that the item is added again to the cart
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product5.quantity * 2}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total
    })
    
    /**
     * Test Case ID: E2E_14
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can search for a product and add it to cart", () => {
        // search for item
        homePage.search(product18.name.substr(0,5))

        // assert that item is found and select item
        cy.get(homePage.getProductCardData(1)[0])
            .should("contain", product18.name)
        homePage.addToCart(1, product18.quantity)

        // calculate total
        total = product18.price * product18.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product18.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${product18.price}`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product18.quantity}`) // check product quantity
    })
    
    /**
     * Test Case ID: E2E_15
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can ause the direct link to the product details page and add the product to cart", () => {
        // go to product information page
        cy.visit("https://ui-automation-camp.vercel.app/products/quality-mousepad")

        // wait for the page to load
        cy.wait(500)

        // assert that the user is on the product information page
        cy.url()
            .should("contain", "quality-mousepad")
        cy.get(detailsPage.productName)
            .should("contain", product3.name)
        cy.get(detailsPage.productDescription)
            .should("contain", product3.desc)
        cy.get(detailsPage.productPrice)
            .should("contain", `$${product3.price}`)
        
        // add product to cart
        detailsPage.addToCart(product3.quantity)
        
        // calculate total
        total = product3.price * product3.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product3.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${product3.quantity * product3.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product3.quantity}`) // check product quantity
        cy.get(cartPage.cartTotal)
            .should("contain", `$${total}.00`) // check total       
    })
    
    /**
     * Test Case ID: E2E_16
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user cannot add a product to cart with blank quantity", () => {
        // add product to cart with blank quantity
        homePage.addToCart(13, "")
        cy.once("uncaught:exception", () => false);

        // go to cart
        cy.get(homePage.cartButton).click()
        cy.wait(2000)
        
        // assert that product is not in the cart
        cy.get(cartPage.firstProductCard)
            .should("not.exist")
        cy.get(cartPage.cartError)
            .should("be.visible")
    })

    /**
     * Test Case ID: E2E_17
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can only use numeric characters as input for quantity", () => {
        // add product to cart using invalid input 
        homePage.addToCart(13, "a")
        cy.once("uncaught:exception", () => false);
        
        // go to cart
        cy.get(homePage.cartButton).click()
        cy.wait(2000)

        // assert that product is not in the cart
        cy.get(cartPage.firstProductCard)
            .should("not.exist")
        cy.get(cartPage.cartError)
            .should("be.visible")

        // close cart
        cartPage.closeCart()

        // add a valid number and add product to cart
        homePage.addToCart(13, product13.quantity)
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", product13.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(product13.quantity * product13.price)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${product13.quantity}`) // check product quantity
    })

})