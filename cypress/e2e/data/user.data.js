module.exports = {
    newUser: {
        email: "johndoe5@mail.com",
        password: "P@ssword1"
    },
    existingUser: {
        email: "johndoe1@mail.com",
        password: "P@ssword1",
        errorMsg: "We're sorry, something went wrong"
    },
    nonexistingUser: {
        email: "jd@mail.com",
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
