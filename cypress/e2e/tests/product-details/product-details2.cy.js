import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import detailsPage from "../../pages/details.page"


describe("Product Details (41 - 44)", () => {
    
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)

        // visit the product details page
        cy.visit("https://ui-automation-camp.vercel.app/products/couch-1")
        
        // wait for the page to load
        cy.wait(2000)
    })

    /**
     * Test Case ID: E2E_41
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can view the product images", () => {
        // assert that the product image is visible
        cy.get(detailsPage.productImage)
            .should("be.visible")
            .and("have.attr", "src", "https://images.pexels.com/photos/9086927/pexels-photo-9086927.jpeg?auto=compress&cs=tinysrgb&w=800")
    })

    /**
     * Test Case ID: E2E_42
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can view the name and details of the product", () => {
        // assert that the product details are visible and correct
        cy.get(detailsPage.productName)
            .should("be.visible")
            .and("contain.text", productData.product17.name)
        cy.get(detailsPage.productDescription)
            .should("be.visible")
            .and("contain.text", productData.product17.desc)
        cy.get(detailsPage.productPrice)
            .should("be.visible")
            .and("contain.text", productData.product17.price)
        cy.get(detailsPage.productCategory)
            .should("be.visible")
            .and("contain.text", productData.product17.category)
    })

    /**
     * Test Case ID: E2E_43
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user can modify the product quantity using numbers", () => {
        // assert that the default quantity is 1
        cy.get(detailsPage.productQuantity)
            .should("contain.value", 1)

        // modify quantity with a valid number
        detailsPage.modifyQuantity(productData.product17.quantity)

        // check that the quantity has changed and is not equal to 1 (default)
        cy.get(detailsPage.productQuantity)
        .should("contain.value", productData.product17.quantity)
        .and("not.contain.value", 1)
    })

    /**
     * Test Case ID: E2E_44
     * Test Scenario: Check the functionality and UI of the product details page
     */
    it("should verify that the user cannot modify the quantity of a product with non-numeric characters", () => { 
        // assert that the default quantity is 1
        cy.get(detailsPage.productQuantity)
            .should("contain.value", 1)

        // modify quantity with a non-numeric character
        detailsPage.modifyQuantity("a")
        cy.once('uncaught:exception', () => false);

        // check that the quantity has changed and is not equal to 1 (default)
        cy.get(detailsPage.productQuantity)
        .should("have.text", "")
        .and("not.contain.value", 1)
    })

})