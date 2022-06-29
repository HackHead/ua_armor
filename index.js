// Importing required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import path from "path";
// 
dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 1337;
const DB_CONNECT = process.env.DB_CONNECT;
const __dirname = path.resolve();

app.set("view engine", "pug");
app.set("views", path.join(path.resolve(__dirname), '/static/views'));

app.use("/img", express.static(path.join(__dirname, '/static/assets/img')))
app.use("/css", express.static(path.join(__dirname, '/static/assets/css')))
app.use("/js", express.static(path.join(__dirname, '/static/assets/js')))
app.use("/fonts", express.static(path.join(__dirname, '/static/assets/fonts')))

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


