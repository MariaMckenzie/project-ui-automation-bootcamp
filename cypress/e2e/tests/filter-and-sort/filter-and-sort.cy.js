import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"

describe('Sort-and-Filter (54 - 60)', () => {    
        // variables
        let lst, key, category
        let productsList = [
            [productData.product1.name, productData.product1.category, productData.product1.price], [productData.product2.name, productData.product2.category, productData.product2.price],
            [productData.product3.name, productData.product3.category, productData.product3.price], [productData.product4.name, productData.product4.category, productData.product4.price],
            [productData.product5.name, productData.product5.category, productData.product5.price], [productData.product6.name, productData.product6.category, productData.product6.price],
            [productData.product7.name, productData.product7.category, productData.product7.price], [productData.product8.name, productData.product8.category, productData.product8.price],
            [productData.product9.name, productData.product9.category, productData.product9.price], [productData.product10.name, productData.product10.category, productData.product10.price],
            [productData.product11.name, productData.product11.category, productData.product11.price], [productData.product12.name, productData.product12.category, productData.product12.price],
            [productData.product13.name, productData.product13.category, productData.product13.price], [productData.product14.name, productData.product14.category, productData.product14.price],
            [productData.product15.name, productData.product15.category, productData.product15.price], [productData.product16.name, productData.product16.category, productData.product16.price],
            [productData.product17.name, productData.product17.category, productData.product17.price], [productData.product18.name, productData.product18.category, productData.product18.price],
            [productData.product19.name, productData.product19.category, productData.product19.price], [productData.product20.name, productData.product20.category, productData.product20.price],
            [productData.product21.name, productData.product21.category, productData.product21.price], [productData.product22.name, productData.product22.category, productData.product22.price]
        ]
    
    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(userData.existingUser.email, userData.existingUser.password)
        
        // wait for the page to load
        cy.wait(2000)
    })


    /**
     * Test Case ID: E2E_54
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        cy.get(homePage.sortSelection)
            .should("be.visible")
        cy.get(homePage.categorySelection)
            .should("be.visible")
    })
    
    /**
     * Test Case ID: E2E_55
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by name in ascending order", () => {
        // sort products by name (a-z)
        homePage.sortProducts('az')
        lst = productsList.sort(function(a, b){ return a[0].localeCompare(b[0]) }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", lst[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", lst[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", lst[21][0])
    })
    
    /**
     * Test Case ID: E2E_56
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by name in descending order", () => {
        // sort products by name (a-z)
        homePage.sortProducts('za')
        lst = productsList.sort(function(a, b){ return b[0].localeCompare(a[0]) }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", lst[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", lst[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", lst[21][0])
    })
    
    /**
     * Test Case ID: E2E_57
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by price in ascending order", () => {
        // sort products by price (low - high)
        homePage.sortProducts('loHi')
        lst = productsList.sort(function(a, b){ 
            if (a[2] === b[2]) {
                return b[0].localeCompare(a[0])
            } return a[2] - b[2]             
        }) // sort products list

        //console.log(productsList)

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", lst[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", lst[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", lst[21][0])
    })
    
    /**
     * Test Case ID: E2E_58
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by price in descending order", () => {
        // sort products by price (high - low)
        homePage.sortProducts('hiLo')
        lst = productsList.sort(function(a, b){ 
            if (a[2] === b[2]) {
                return b[0].localeCompare(a[0])
            } return b[2] - a[2]             
        }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", lst[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", lst[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", lst[21][0])
    })    
    
    /**
     * Test Case ID: E2E_59
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the search results on the home page", () => {
        // search for product
        key = "shirt"
        homePage.search(key)
        
        // sort search results from a-z
        lst = productsList.filter(function(x) {return x[0].includes(key)}).sort(function(a, b){ return a[0].localeCompare(b[0]) })
        console.log(lst)
        homePage.sortProducts("az")

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])
    })
    
    /**
     * Test Case ID: E2E_60
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can filter products by category", () => {
        // clear list
        lst = []
        productsList = [
            [productData.product1.name, productData.product1.category, productData.product1.price], [productData.product2.name, productData.product2.category, productData.product2.price],
            [productData.product3.name, productData.product3.category, productData.product3.price], [productData.product4.name, productData.product4.category, productData.product4.price],
            [productData.product5.name, productData.product5.category, productData.product5.price], [productData.product6.name, productData.product6.category, productData.product6.price],
            [productData.product7.name, productData.product7.category, productData.product7.price], [productData.product8.name, productData.product8.category, productData.product8.price],
            [productData.product9.name, productData.product9.category, productData.product9.price], [productData.product10.name, productData.product10.category, productData.product10.price],
            [productData.product11.name, productData.product11.category, productData.product11.price], [productData.product12.name, productData.product12.category, productData.product12.price],
            [productData.product13.name, productData.product13.category, productData.product13.price], [productData.product14.name, productData.product14.category, productData.product14.price],
            [productData.product15.name, productData.product15.category, productData.product15.price], [productData.product16.name, productData.product16.category, productData.product16.price],
            [productData.product17.name, productData.product17.category, productData.product17.price], [productData.product18.name, productData.product18.category, productData.product18.price],
            [productData.product19.name, productData.product19.category, productData.product19.price], [productData.product20.name, productData.product20.category, productData.product20.price],
            [productData.product21.name, productData.product21.category, productData.product21.price], [productData.product22.name, productData.product22.category, productData.product22.price]
        ]

        // filter products by category
        category = "hat"
        lst = productsList.filter(function(x) {return x[1].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are filtered 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        
            
        // filter products by category
        category = "shirt"
        lst = productsList.filter(function(x) {return x[1].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are filtered 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])

        
        // filter products by category
        category = "laptop"
        lst = productsList.filter(function(x) {return x[1].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are filtered 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])
    })

})
