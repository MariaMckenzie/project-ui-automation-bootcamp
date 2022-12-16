import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"

describe('Sort-and-Filter (61 - 66)', () => {    
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
     * Test Case ID: E2E_61
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can sort the filtered products", () => {
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
        category = "couch"
        lst = productsList.filter(function(x) {return x[1].includes(category)})

        homePage.filterProducts(category)

        // assert that the products are filtered 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])

        // sort the filtered products by price (low - high)
        homePage.sortProducts('loHi')
        lst = lst.sort(function(a, b){ 
            if (a[2] === b[2]) {
                return b[0].localeCompare(a[0])
            } return a[2] - b[2]             
        }) // sort products list

        // assert that the products are sorted 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])
    })
    
    /**
     * Test Case ID: E2E_62
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can filter the search results on the home page", () => {
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
    
        // search for product
        key = "c"
        category = "couch"
        homePage.search(key)
        
        // filter search results by category
        lst = productsList.filter(function(x) {return x[0].includes(key) & x[1].includes(category)})
        homePage.filterProducts(category)

        // assert that the products are filtered 
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[1][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[2][0])
    })
    
    /**
     * Test Case ID: E2E_63
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user can reset the selected sort and filter options", () => {        
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
         category = "couch"
         lst = productsList.filter(function(x) {return x[1].includes(category)})
 
         homePage.filterProducts(category)
 
         // assert that the products are filtered 
         cy.get(homePage.getProductCardData(1)[0])
             .should("have.text", lst[0][0])
         cy.get(homePage.getProductCardData(2)[0])
             .should("have.text", lst[1][0])
         cy.get(homePage.getProductCardData(3)[0])
             .should("have.text", lst[2][0])
 
         // sort the filtered products by price (low - high)
         homePage.sortProducts('loHi')
         lst = lst.sort(function(a, b){ 
             if (a[2] === b[2]) {
                 return b[0].localeCompare(a[0])
             } return a[2] - b[2]             
         }) // sort products list
 
         // assert that the products are sorted 
         cy.get(homePage.getProductCardData(1)[0])
             .should("have.text", lst[0][0])
         cy.get(homePage.getProductCardData(2)[0])
             .should("have.text", lst[1][0])
         cy.get(homePage.getProductCardData(3)[0])
             .should("have.text", lst[2][0])

        // select the option to reset
        cy.get(homePage.resetButton)
         .should("be.visible")
         .and("contain", "Reset")
        cy.get(homePage.resetButton).click()
    })
    
    /**
     * Test Case ID: E2E_64
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user cannot sort an empty list of products", () => {
        // search for product that does not exist
        key = "apple"
        homePage.search(key)

        // assert that the products list is empty, thus no products are displayed
        cy.get(homePage.firstProductCard)
            .should("not.exist")
        
        // attempt to sort the empty list
        homePage.sortProducts("az")

        // assert that the products list is still empty, thus no products are displayed
        cy.get(homePage.firstProductCard)
            .should("not.exist")
    })
    
    /**
     * Test Case ID: E2E_65
     * Test Scenario: Check the functionality of the sort-and-filter
     */
    it("should verify that the user cannot filter an empty list of products", () => {
        // search for product that does not exist
        key = "apple"
        homePage.search(key)

        // assert that the products list is empty, thus no products are displayed
        cy.get(homePage.firstProductCard)
            .should("not.exist")
        
        // attempt to sort the empty list
        homePage.filterProducts("laptop")

        // assert that the products list is still empty, thus no products are displayed
        cy.get(homePage.firstProductCard)
            .should("not.exist")
    })
    
    /**
     * Test Case ID: E2E_66
     * Test Scenario: Check the functionality of the sort-and-filter
     * Note: Test does not work, there is at least one item that does not fall into any of the categories in the dropdown
     */
    it.skip("should verify that all products can be filtered by category", () => {
        // filter products whose category is not in the category dropdown selection
        lst = productsList.filter(function(x) {return !(x[1].includes("shirt") || x[1].includes("pant") || x[1].includes("hat") || x[1].includes("shoes") || x[1].includes("couch") || x[1].includes("laptop")) })
        
        //console.log(lst) // to view these products

        // assert that the items do not fall in any category from the dropdown selection
        homePage.filterProducts("shirt")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])

        homePage.filterProducts("pant")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])

        homePage.filterProducts("shirt")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(4)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(5)[0])
            .should("have.text", lst[0][0])

        homePage.filterProducts("hat")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])

        homePage.filterProducts("shoes")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])

        homePage.filterProducts("couch")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])

        homePage.filterProducts("laptop")
        cy.get(homePage.getProductCardData(1)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(2)[0])
            .should("have.text", lst[0][0])
        cy.get(homePage.getProductCardData(3)[0])
            .should("have.text", lst[0][0])
    })

})
