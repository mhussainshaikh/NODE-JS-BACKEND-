import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadfilesoncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const registeredUser = asyncHandler(async (req, res, next) => {
  // user details from frontend //
  // validation-not empty//
  //check if user already exist  check through username or email //
  //  check for cover images check for avatar//
  // upload them to cloudinary //,avatar//
  //create user object  - create entry in db//
  // remove password and refresh token field from res//
  //check for user creation//
  //return res

  const { fullName, email, username, password } = req.body;
  console.log(email, "email");
  //  if(fullname===""){
  //   throw new ApiError(400,"fullname is required");

  //  }
  if ([fullName, email, username, password].some((field) => field === "")) {
    throw new ApiError(400, "all fields are required");
  }
  const existinguser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (existinguser) {
    throw new ApiError(409, "user already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }
  const avatar = await uploadfilesoncloudinary(avatarLocalPath);
  const coverImage = await uploadfilesoncloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "failed to upload image");
  }
  const user = await User.create({
    fullName,
    email,
    coverImage: coverImage?.url || "",
    password,
    avatar,
    username: username.toUpperCase(),
  });
  const craetedUser = await user
    .findById(user._id)
    .select("-password -refreshToken");
  if (!craetedUser) {
    throw new ApiError(500, "something went wrong while register a user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        new ApiResponse(201, craetedUser, "user created successfully")
      )
    );
});
