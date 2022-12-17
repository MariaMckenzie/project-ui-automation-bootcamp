import productData from "../../data/product.data"
import userData from "../../data/user.data"
import authenticationPage from "../../pages/authentication.page"
import homePage from "../../pages/home.page"
import favouritesPage from "../../pages/favourites.page"
import detailsPage from "../../pages/details.page"

describe('Favourites', () => {
    // variables
    let count = 0, total = 0

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

    
    it("01: Verifies that the navigation bar is visible", () => {
        // go to favourites 
        cy.get(homePage.favouritesButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the nav bar is visible
        cy.get(favouritesPage.navBar)
            .should("be.visible")

        // assert that the buttons in the nav bar are visible - (home, about, contact, cart, sign out)
        cy.get(favouritesPage.homeButton)
            .should("be.visible")
            .and("contain.text", "Home")
        cy.get(favouritesPage.contactButton)
            .should("be.visible")
            .and("contain.text", "Contact")
        cy.get(favouritesPage.cartButton)
            .should("be.visible")
            .and("contain.text", "0.00")
        cy.get(favouritesPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")
    })

    
    it("02: Verifies that the store’s name and logo are visible at the top of the page", () => { 
        // go to favourites 
        cy.get(homePage.favouritesButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the nav bar is visible
        cy.get(favouritesPage.navBar)
            .should("be.visible")
        
        // assert that the logo and store name are visible
        cy.get(favouritesPage.storeName)
            .should("be.visible")
            .and("contain", "Automation Camp Store")
        cy.get(favouritesPage.storeImage)
            .should("be.visible")
            .and("have.attr", "src", "/favicon.ico")
    })

    
    it("03: Verifies that the user can sign out successfully from the Favourites page", () => {
        // go to favourites 
        cy.get(homePage.favouritesButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the sign out button is visible
        cy.get(favouritesPage.logoutButton)
            .should("be.visible")
            .and("contain.text", "Sign Out")

        // logout
        cy.get(favouritesPage.logoutButton).click()

        // assert that the user is signed out
        cy.url()
            .should("eq", "https://ui-automation-camp.vercel.app/")
    })


    it("04: Verifies that the 'Favourites' button is active", () => {
        // go to favourites 
        cy.get(homePage.favouritesButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the favourites button is highlighted
        cy.get(favouritesPage.favouritesButton)            
            .should("be.visible")
            .and("contain.text", "Favorites")
            .and("have.css", "background-color", "rgb(49, 151, 149)") // button background colour
            .and("have.css", "color", "rgb(255, 255, 255)") // text colour
    })

    
    it("05: Verifies that the user can add a product to favourites from the home page", () => {
        // add a product to favourites
        favouritesPage.addToFavourites(productData.product1.number)
        
        count += 1 // count the toast
        total += 1 // count the number of items

        // assert that the product is added
        cy.get(favouritesPage.getToast(count))
            .should("be.visible")
            .and("contain.text", `${productData.product1.name} added to favorites`)

        cy.get(favouritesPage.favouritesButton)
            .should("contain.text", `[${total}]`)
        
        // go to favourites 
        cy.get(homePage.favouritesButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the item is in favourites
        cy.get(favouritesPage.firstProductCard)
            .should("be.visible")
            .and("contain.text", productData.product1.name)
    })

    
    it("06: Verifies that the user can remove a product from favourites from the home page", () => {
        // add a product to favourites
        favouritesPage.addToFavourites(productData.product1.number)
        
        count = 1 // count the toast
        total = 1 // count the number of items

        // assert that the product is added
        cy.get(favouritesPage.getToast(count))
            .should("contain.text", `${productData.product1.name} added to favorites`)
            .and("have.css", "background-color", "rgb(198, 246, 213)")

        cy.get(favouritesPage.favouritesButton)
            .should("contain.text", `[${total}]`)
                
        // remove item from favourites
        favouritesPage.removeFromFavourites(productData.product1.number)

        count += 1 // count the toast
        total -= 1 // count the number of items

        // assert that the product is removed
        cy.get(favouritesPage.getToast(count))
            .should("contain.text", `${productData.product1.name} removed from favorites`)
            .and("have.css", "background-color", "rgb(254, 215, 215)")

        cy.get(favouritesPage.favouritesButton)
            .should("contain.text", `[${total}]`)
    })

    
    it("07: Verifies that the user can add a product to favourites from the product details page", () => {
        // go to product details page
        cy.visit("https://ui-automation-camp.vercel.app/products/quality-hat")

        // assert that you are on product details page
        cy.get(detailsPage.productName)
            .should("contain.text", "Quality Hat")

        // add product to favourites
        cy.get(detailsPage.addToFavouritesIcon).click()
        
        count += 1 // count the toast
        total += 1 // count the number of items

        // assert that the product is added
        cy.get(favouritesPage.getToast(count))
            .should("be.visible")
            .and("contain.text", `${productData.product1.name} added to favorites`)

        cy.get(favouritesPage.favouritesButton)
            .should("contain.text", `[${total}]`)
        
        // go to favourites 
        cy.get(homePage.favouritesButton).click()

        // wait for the page to load
        cy.wait(2000)

        // assert that the item is in favourites
        cy.get(favouritesPage.firstProductCard)
            .should("be.visible")
            .and("contain.text", productData.product1.name)
    })

})
