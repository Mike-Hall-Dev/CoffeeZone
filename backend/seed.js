import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/data.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectToDB from "./config/db.js";

dotenv.config();
connectToDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const newUsers = await User.insertMany(users);
        const adminUser = newUsers[0]._id

        const newProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(newProducts);

        console.log("Data Imported")
        process.exit();
    } catch (err) {
        console.error(`${error}`)
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Removed!");
        process.exit();
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    deleteData();
} else {
    importData();
}