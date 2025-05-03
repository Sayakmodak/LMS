import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import dbConnection from './db/connection.js';
import userRoute from "./routes/user.route.js";

const port = process.env.PORT || 8080;

const app = express();

// default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// connect db
dbConnection()


// all apis
app.use("/api/auth/user", userRoute);

app.get("/", (req, res) => {
    res.send("LMS");
})
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})