// Importing required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"

// 
dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 1337;
const DB_CONNECT = process.env.DB_CONNECT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        mongoose.connect(DB_CONNECT, () => {
            console.log(`Database connections successfully established`)
        })
    } catch (err) {
        console.log(err)
    }
})



