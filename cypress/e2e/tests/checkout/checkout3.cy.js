import userData from "../../data/user.data"
import checkoutData from "../../data/data-driven/checkout.data"
import authenticationPage from "../../pages/authentication.page"
import thankyouPage from "../../pages/thankyou.page"
import detailsPage from "../../pages/details.page"
import cartPage from "../../pages/cart.page"
import checkoutPage from "../../pages/checkout.page"

describe('Checkout - Data Driven', () => {

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

        // got to product details page
        cy.visit("https://ui-automation-camp.vercel.app/products/quality-mousepad")
    
        // wait for the page to load
        cy.wait(2000)

        // add product to cart
        detailsPage.addToCart(2)

        // wait for the page to load
        cy.wait(2000)

        // go to cart
        cy.visit("https://ui-automation-camp.vercel.app/products#/cart")

        // go to checkout
        cy.get(cartPage.checkoutButton).click()

    })

    for (const buyer of checkoutData) {
        it(`should attempt to complete the checkout form with ${buyer.dataType}`, () => { 
            // attempt go to payments section
            checkoutPage.addBillingInformation(buyer.name, buyer.email, buyer.addr)

            // check for errors and success 
            if (buyer.dataType == "valid information") {
                // assert that the user can cmove on
                cy.get(checkoutPage.paymentTitle)
                    .should("be.visible")
            }

            if (buyer.dataType == "missing data" || buyer.dataType == "invalid data") {
                cy.get(checkoutPage.countryError)
                    .should("be.visible") // error message
                    .and("contain", "This field is required") 
                    .and("have.css", "color", "rgb(158, 34, 21)") // text colour
                cy.get(checkoutPage.cityError)
                    .should("be.visible") // error message
                    .and("contain", "This field is required")
                    .and("have.css", "color", "rgb(158, 34, 21)") // text colour
            }

        })
    }

})
