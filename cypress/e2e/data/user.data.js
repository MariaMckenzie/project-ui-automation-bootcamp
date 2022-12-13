module.exports = {
    newUser: {
        email: "johndoe5@mail.com",
        password: "P@ssword1"
    },
    existingUser: {
        email: "johndoe1@mail.com",
        password: "P@ssword1",
        errorMsg: "We're sorry, something went wrong",
        name: "John Doe",
        addr: ["1 Rosewood Avenue","Kingston 4","Kingston","JM","123456"],
        badAddr: ["1 Rosewood Avenue","","Florida","","123456"],
        cardInfo: [4242424242424242,1224, 123]
    },
    nonexistingUser: {
        email: "jd14@mail.com",
        password: "P@ssword1",
        errorMsg: "Wrong email or password"
    },
    invalidData: {
        email: "janedoe",
        password: "password",
        errorMsg: ["Email is invalid", "Password is invalid"]
    },
    missingEmail: {
        email: "",
        password: "P@ssword1",
        errorMsg: "Email can't be blank"
    },
    missingPassword: {
        email: "janedoe@mail.com",
        password: "",
        errorMsg: "Password can't be blank"
    },
    missingData: {
        email: "",
        password: "",
        errorMsg: ["Email can't be blank", "Password can't be blank"]
    }
}
