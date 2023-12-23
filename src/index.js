import connectionDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./env",
});

const port = process.env.PORT || 8000;

console.clear();
connectionDB()
    .then(() => {
        try {
            app.listen(port, () => {
                console.log(
                    ` Server is running on port ${port}\n http://localhost:${port}/api/v1/users/register/`
                );
            });
        } catch (error) {
            console.log("Error while getting port", error);
        }
    })
    .catch((error) => {
        console.log("MongoDB db Connection FAILED: " + error.message);
    });
