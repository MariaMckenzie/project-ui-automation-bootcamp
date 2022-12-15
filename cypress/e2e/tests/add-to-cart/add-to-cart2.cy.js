import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import cartPage from "../../pages/cart.page"
import homePage from "../../pages/home.page"
import detailsPage from "../../pages/details.page"


describe("Add-to-cart (14 - 17)", () => {
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
     * Test Case ID: E2E_14
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can search for a product and add it to cart", () => {
        // search for item
        homePage.search(productData.product18.name.substr(0,5))

        // assert that item is found and select item
        cy.get(homePage.getProductCardData(1)[0])
            .should("contain", productData.product18.name)
        homePage.addToCart(1, productData.product18.quantity)

        // calculate total
        total = productData.product18.price * productData.product18.quantity

        // wait for the page to load
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product18.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${productData.product18.price}`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product18.quantity}`) // check product quantity
    })
    
    /**
     * Test Case ID: E2E_15
     * Test Scenario: Check add-to-cart functionality
     */
    it("should verify that the user can ause the direct link to the product details page and add the product to cart", () => {
        // go to product information page
        cy.visit("https://ui-automation-camp.vercel.app/products/quality-mousepad")

        // wait for the page to load
        cy.wait(2000)

        // assert that the user is on the product information page
        cy.url()
            .should("contain", "quality-mousepad")
        cy.get(detailsPage.productName)
            .should("contain", productData.product3.name)
        cy.get(detailsPage.productDescription)
            .should("contain", productData.product3.desc)
        cy.get(detailsPage.productPrice)
            .should("contain", `$${productData.product3.price}`)
        
        // add product to cart
        detailsPage.addToCart(productData.product3.quantity)
        
        // calculate total
        total = productData.product3.price * productData.product3.quantity

        // wait for the page to load
        cy.wait(3000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product3.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${productData.product3.quantity * productData.product3.price}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product3.quantity}`) // check product quantity
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
        homePage.addToCart(13, productData.product13.quantity)
        cy.wait(2000)

        // assert that the product is in the cart
        cy.get(cartPage.firstProductCard)
            .should("be.visible")
        cy.get(cartPage.getProductCardData(1)[0])
            .should("contain", productData.product13.name) // check product name
        cy.get(cartPage.getProductCardData(1)[1])
            .should("contain", `$${cartPage.numberWithCommas(productData.product13.quantity * productData.product13.price)}.00`) // check product price
        cy.get(cartPage.getProductCardData(1)[2])
            .should("have.text", `${productData.product13.quantity}`) // check product quantity
    })

})
