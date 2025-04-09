// Importing necessary modules
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import {uploadfilesoncloudinary} from "../utils/cloudinary.js";
// Exporting a function to handle registered users
const registeredUser = asyncHandler(async (req, res) => {
  // get user detail from frontend//
  // validation of user detail - not empty//
  // check if user already exist - username or email  //
  // check for images,check for avatar compulsory //
  // upload them to cloudinary,avatar //
  // create user object, entry in db //
  // remove password and refresh token field from response //
  // check for user creation //
  // send response to frontend//
  const { fullName, email, password, username, avatar } = req.body;
  console.log(`email:${email}`);

  if (
    [fullName, email, username, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError("Please enter your full name", 400);
  }
  const existedUser = User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError("User with email and username already exist", 409);
  }
  const avatarlocalpath = req.files?.avatar[0]?.path;
  const coverimagelocalpath = req.files?.coverimage[0]?.path;

  if(! avatarlocalpath){
    throw new ApiError("Please upload your avatar", 400);
  }

  const Avatar = await  uploadfilesoncloudinary(avatarlocalpath)
  const Coverimage = await  uploadfilesoncloudinary(coverimagelocalpath)

  if(! Avatar){
    throw new ApiError("Please upload your avatar", 400);
  }
 const user =await User.create({
    fullName,
    email,
    password,
    username:username.toLowerCase(),
    avatar:Avatar.secure_url,
    coverimage:Coverimage?.secure_url || null,
  }
  )
 const userCreated=  await User.findByIdAndDelete(user._id).select("-password -refreshToken")

 if(! userCreated){
    throw new ApiError("User not created", 400);
  }
 return res.status(201).json(new ApiResponse(userCreated, 201,"User created successfully"));
});

export { registeredUser };
