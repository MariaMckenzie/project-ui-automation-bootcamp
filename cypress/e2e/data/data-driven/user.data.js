module.exports = [
    {
        userType: "an existing user",
        email: "johndoe1@mail.com",
        password: "P@ssword1",
        errorMsg: "We're sorry, something went wrong"
    },
    {
        userType: "a user that does not exist",
        email: "jd15@mail.com",
        password: "P@ssword1",
        errorMsg: "Wrong email or password"
    },
    {
        userType: "a user whose email and password are not valid",
        email: "janedoe",
        password: "password",
        errorMsg: ["Email is invalid", "Password is invalid"]
    },
    {
        userType: "a user without an email",
        email: "",
        password: "P@ssword1",
        errorMsg: "Email can't be blank"
    },
    {
        userType: "a user without a password",
        email: "janedoe@mail.com",
        password: "",
        errorMsg: "Password can't be blank"
    },
    {
        userType: "user who leaves both fields blank",
        email: "",
        password: "",
        errorMsg: ["Email can't be blank", "Password can't be blank"]
    }
]