import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verify } from "jsonwebtoken";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

// Route for user registration
router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);


//secured routs

router.route("/logout").post(verifyJWT, logoutUser);


export default router;
