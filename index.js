// Importing required modules
import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import path from "path";
import bodyParser from "express";
import cookieParser from "cookie-parser";
import xssClean from "xss-clean/lib/index.js";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import MongoStore from "connect-mongo";
// Importing routes
import AdminRoutes from "./routes/AdminRoutes.js";
import PublicRoutes from "./routes/PublicRoutes.js"

dotenv.config({
    path: './config/.env',
});
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,    // 10 minutes
    max: 100                     // 100 requests per IP
});

const app = express();
const PORT = process.env.PORT || 1337;
const DB_CONNECT = process.env.DB_CONNECT;
const __dirname = path.resolve();

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
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: { maxAge: 180 * 60 * 1000, secure: false }
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



