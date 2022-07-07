// Importing required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import path from "path";
import bodyParser from "express";
import cookieParser from "cookie-parser";
import xssClean from "xss-clean/lib/index.js";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { rateLimit } from "express-rate-limit";


import { v4 as uuidv4 } from 'uuid';
import session from "express-session";
import AdminRoutes from "./routes/AdminRoutes.js";
import PublicRoutes from "./routes/PublicRoutes.js"
import ApiRoutes from "./routes/Api.js"
import { default as MongoStore } from "connect-mongo"


dotenv.config({
    path: './config/.env',
});

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,    // 10 minutes
    max: 100                     // 100 requests per IP
});

const app = express();
const PORT = process.env.PORT || 1337;
const __dirname = path.resolve();
const DB_CONNECT = process.env.DB_CONNECT;

dotenv.config({
    path: './config/.env',
});

app.set("view engine", "pug");
app.set("views", path.join(path.resolve(__dirname), '/static/views'));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Security middleware
app.use(xssClean());
app.use(ExpressMongoSanitize())
// app.use(helmet());
app.use(hpp());
// app.use(limiter);
app.set('trust proxy', 1) // trust first proxy

mongoose.connect(DB_CONNECT, () => {
    console.log('Database connection successfullyh established')
});


const store = MongoStore.create({
    mongoUrl: DB_CONNECT,
    collection: 'sessions',
  });



app.use(session({
  genid: (req) => {
    return uuidv4()
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: 3600 * 1000 * 24, secure: false }
}))

app.use("/static", express.static(path.join(__dirname, '/static')));
app.use("/img", express.static(path.join(__dirname, '/static/assets/img')))
app.use("/css", express.static(path.join(__dirname, '/static/assets/css')))
app.use("/js", express.static(path.join(__dirname, '/static/assets/js')))
app.use("/fonts", express.static(path.join(__dirname, '/static/assets/fonts')))
app.use("/libs", express.static(path.join(__dirname, '/static/assets/libs')))
app.use("/generall", express.static(path.join(__dirname, '/static/assets/generall')))
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

app.use(AdminRoutes)
app.use(PublicRoutes)
app.use(ApiRoutes)

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
})



