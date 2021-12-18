import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin user",
        email: "admin@coffeezone.com",
        password: bcrypt.hashSync("ilovecoffee123"),
        isAdmin: true
    },
    {
        name: "Molly",
        email: "molly@coffeezone.com",
        password: bcrypt.hashSync("ilovecoffee123")
    },
    {
        name: "Haley",
        email: "haley@coffeezone.com",
        password: bcrypt.hashSync("ilovecoffee123"),
    }
]

export default users;