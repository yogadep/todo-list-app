import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const url = process.env.DATABASE_URL

export const connect = async (req, res) => {
    try {
        mongoose.connect(url)
    } catch (error) {
        console.log('gagal terhubung ke database');
    }
}