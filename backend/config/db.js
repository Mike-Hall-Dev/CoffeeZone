import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);

        console.log(`MogoDB Connected: ${connection.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDB;