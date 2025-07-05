import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import dbConnection from './db/connection.js';
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
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
app.use("/api/v1/media", mediaRoute);
app.use("/api/auth/user", userRoute);
app.use("/api/auth/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);

app.get("/", (req, res) => {
    res.send("LMS");
})
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})