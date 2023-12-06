import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinaryFileUpload.js";



export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;
        console.log(fullName, email, username, password);

        if ([fullName, email, username, password].some((field) => !field || field.trim() === "")) {
            throw new ApiError(400, "Please fill all the fields");
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existedUser) {
            throw new ApiError(409, "User with the same username & email already exists");
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if(!avatarLocalPath){
            throw new ApiError(400, "Please upload an avatar file");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "Please upload an avatar file");
        }

        const user = await User.create({
            fullName,
            email,
            username:username.toLowerCase(),
            password,
            avatar: avatar.url,
            coverImage: coverImage?.url || ""
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser){
            throw new ApiError(400, "Something went wrong while registering user")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User Registered successfully")
        )

        
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
        console.error("Error occurred while registering user:", error);
        throw new ApiError(404, "Error occurred while registering user");
    }
});
