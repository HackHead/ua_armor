// Importing required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import path from "path";
import bodyParser from "express";

// Importing routes
import AdminRoutes from "./routes/AdminRoutes.js";
import GenerallRoutes from "./routes/GeneralRoutes.js";
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

app.use(express.json());
app.use(express.urlencoded());

app.use("/static", express.static(path.join(__dirname, '/static')));
app.use("/img", express.static(path.join(__dirname, '/static/assets/img')))
app.use("/css", express.static(path.join(__dirname, '/static/assets/css')))
app.use("/js", express.static(path.join(__dirname, '/static/assets/js')))
app.use("/fonts", express.static(path.join(__dirname, '/static/assets/fonts')))
app.use("/libs", express.static(path.join(__dirname, '/static/assets/libs')))
app.use("/generall", express.static(path.join(__dirname, '/static/assets/generall')))
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

app.use(AdminRoutes)
app.use(GenerallRoutes)


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await mongoose.connect(DB_CONNECT, () => {
            console.log(`Database connections successfully established`)
        })
    } catch (err) {
        console.log(err)
    }
})



