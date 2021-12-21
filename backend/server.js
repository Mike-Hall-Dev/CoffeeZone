import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandlers.js"
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();

//allow req body parsing
app.use(express.json());

// mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// custom error middleware
app.use(notFound)
app.use(errorHandler);


app.get("/", (req, res) => {
    res.send("App is running...")
})


const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV

app.listen(PORT, console.log(`server is running in ${MODE} mode on port ${PORT}`));