module.exports = [
    {
        dataType: "valid information",
        name: "John Doe",
        email: "johndoe@mail.com",
        addr: ["1 Rosewood Avenue","Kingston 4","Kingston","JM","123456"],
        cardInfo: [4242424242424242,1224, 123]
    },
    {
        dataType: "valid information",
        name: "Jane Doe",
        email: "janedoe@mail.com",
        addr: ["1 Rosewood Avenue","Kingston 4","Kingston","JM","123456"],
        cardInfo: [4242424242424242,1224, 123]
    },
    {
        dataType: "missing data",
        name: "",
        email: "",
        addr: ["1 Rosewood Avenue","","","",""],
        cardInfo: [4242424242424242,1224, 123]
    },
    {
        dataType: "invalid email",
        name: "",
        email: "dbsds",
        addr: ["1 Rosewood Avenue","","","",""],
        cardInfo: [4242424242424242,1224, 123]
    },
]