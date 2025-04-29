import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnection from './db/connection.js';


const port = process.env.PORT || 8080;

const app = express();

// connect db
dbConnection()


app.get("/", (req, res) => {
    res.send("LMS");
})
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})