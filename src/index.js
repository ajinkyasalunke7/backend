import connectionDB from "./db/db.js";
import dotenv from "dotenv"
import express from "express";

const app = express();
dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 8000

connectionDB()
    .then(() => {
        try {
            app.listen(port, () => {
                console.log("Server is running on port " + port)
            })
        } catch (error) {
            console.log("Error while getting port", error)
        }
    })
    .catch((error) => {
        console.log("MongoDB db Connection FAILED: " + error.message)
    })
