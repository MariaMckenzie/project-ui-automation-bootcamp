import { product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15, product16, product17, product18, product19, product20, product21, product22 } from "../../data/product.data"
import { existingUser } from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"

describe('Sort-and-Filter', () => {
    // variables
    let lst, key, category
    let productsList = [
        [product1.name, product1.category, product1.price],
        [product2.name, product2.category, product2.price],
        [product3.name, product3.category, product3.price],
        [product4.name, product4.category, product4.price],
        [product5.name, product5.category, product5.price],
        [product6.name, product6.category, product6.price],
        [product7.name, product7.category, product7.price],
        [product8.name, product8.category, product8.price],
        [product9.name, product9.category, product9.price],
        [product10.name, product10.category, product10.price],
        [product11.name, product11.category, product11.price],
        [product12.name, product12.category, product12.price],
        [product13.name, product13.category, product13.price],
        [product14.name, product14.category, product14.price],
        [product15.name, product15.category, product15.price],
        [product16.name, product16.category, product16.price],
        [product17.name, product17.category, product17.price],
        [product18.name, product18.category, product18.price],
        [product19.name, product19.category, product19.price],
        [product20.name, product20.category, product20.price],
        [product21.name, product21.category, product21.price],
        [product22.name, product22.category, product22.price]
    ]

    beforeEach(() => {
        cy.clearCookies() // clear all cookies before starting the tests
        cy.visit('/')

        // go to authentication page
        cy.get(authenticationPage.signInOrRegisterButton).click()

        // wait for the page to load
        cy.wait(1000)

        // attempt to login with valid user data
        authenticationPage.loginOrSignup(existingUser.email, existingUser.password)
        
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
        cy.get(homePage.filterProducts)
            .should("be.visible")
    })
    
    /**
     * Test Case ID: E2E_55
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by name in ascending order", () => {
        // sort products by name (a-z)
        homePage.sortProducts('az')
        productsList.sort(function(a, b){ return a[0].localeCompare(b[0]) }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", productsList[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", productsList[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", productsList[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", productsList[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", productsList[21][0])
    })
    
    /**
     * Test Case ID: E2E_56
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by name in descending order", () => {
        // sort products by name (a-z)
        homePage.sortProducts('za')
        productsList.sort(function(a, b){ return b[0].localeCompare(a[0]) }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", productsList[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", productsList[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", productsList[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", productsList[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", productsList[21][0])
    })
    
    /**
     * Test Case ID: E2E_57
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by price in ascending order", () => {
        // sort products by name (a-z)
        homePage.sortProducts('loHi')
        productsList.sort(function(a, b){ 
            if (a[2] === b[2]) {
                return a[0].localeCompare(b[0])
            } return a[2] - b[2]             
        }) // sort products list

        //console.log(productsList)

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", productsList[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", productsList[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", productsList[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", productsList[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", productsList[21][0])
    })
    
    /**
     * Test Case ID: E2E_58
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the products by price in descending order", () => {
        // sort products by name (a-z)
        homePage.sortProducts('hiLo')
        productsList.sort(function(a, b){ 
            if (a[2] === b[2]) {
                return a[0].localeCompare(b[0])
            } return b[2] - a[2]             
        }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", productsList[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", productsList[1][0])
        cy.get(homePage.getProductCardData(11)[0])
            .should("have.text", productsList[10][0])
        cy.get(homePage.getProductCardData(21)[0])
            .should("have.text", productsList[20][0])
        cy.get(homePage.getProductCardData(22)[0])
            .should("have.text", productsList[21][0])
    })
    
    
    /**
     * Test Case ID: E2E_59
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the search results on the ‘product’ page", () => {
        // search for word
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
    it.only("should verify that the user can filter products by category", () => {
        // filter products by category
        category = "hat"
        lst = productsList.filter(function(x) {return x[0].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        
            
        // filter products by category
        category = "pant"
        lst = productsList.filter(function(x) {return x[0].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])

        
        // filter products by category
        category = "laptop"
        lst = productsList.filter(function(x) {return x[0].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })
    
    /**
     * Test Case ID: E2E_5
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the sort and filter selections are visible", () => {
        
    })


// Verifies that the user can sort the filtered products
// Verifies that the user can filter the search results on the ‘product’ page
// Verifies that the user can reset the selected sort and filter options
// Verifies that the user cannot sort an empty list of products
// Verifies that the user cannot filter an empty list of products

})
