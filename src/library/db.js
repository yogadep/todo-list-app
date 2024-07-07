import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const url = process.env.DATABASE_URL

export const connect = async (req, res) => {
    try {
        await mongoose.connect(url)
    } catch (error) {
        console.log("Failed to connect to the database");
        throw error;
    }
};