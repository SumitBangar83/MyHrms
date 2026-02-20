import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db connected")
    }
    catch (err) {
        console.log("monogodb connection failed !", err.message);
    }
}