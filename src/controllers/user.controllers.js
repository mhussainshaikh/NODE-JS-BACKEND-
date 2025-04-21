// Import necessary modules and functions
import { uploadfilesoncloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    // Find user by ID
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefereshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "  Error generating access token and refresh token"
    );
  }
};

// Define a function to handle user registration
const registeredUser = asyncHandler(async (req, res) => {
  // Extract user input from request body
  const fullName = req.body.fullName?.trim();
  const email = req.body.email?.trim();
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  // Check if all required fields are provided
  if (!fullName || !email || !username || !password) {
    throw new ApiError(400, "Please enter all required fields");
  }

  // Check if a user with the same email or username already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(400, "User with this email or username already exists");
  }

  // Access the uploaded file paths
  const avatarlocalpath = req?.files?.avatar?.[0]?.path;
  const coverImagelocalpath = req?.files?.coverImage?.[0]?.path;

  // Check if an avatar is uploaded
  if (!avatarlocalpath) {
    throw new ApiError(400, "Please upload your avatar");
  }

  try {
    // Upload avatar to Cloudinary
    const avatarResult = await uploadfilesoncloudinary(avatarlocalpath);
    let coverResult = null;

    // Upload cover image to Cloudinary if provided
    if (coverImagelocalpath) {
      coverResult = await uploadfilesoncloudinary(coverImagelocalpath);
    }

    // Check if avatar was uploaded successfully
    if (!avatarResult?.secure_url) {
      throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }

    // Create user in database
    const user = await User.create({
      fullName,
      email,
      password,
      username: username.toLowerCase(),
      avatar: avatarResult.secure_url,
      coverImage: coverResult?.secure_url || null, // ✅ fixed typo here
    });

    // Exclude sensitive fields from response
    const userCreated = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!userCreated) {
      throw new ApiError(400, "User not created");
    }

    // Return success response
    return res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", userCreated));
  } catch (error) {
    // Return error response
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

//this is the login for user //

const loginUser = asyncHandler(async (req, res) => {
  // console.log("Incoming Request Body:", req.body);
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "Please provide either email or username");
  }

  const user = await User.findOne({
    $or: [{ email }, { password }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.ispasswordMatch(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  console.log(accessToken, refreshToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    // maxAge: 24 * 60 * 60 * 1000 // 1 day
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, "User LoggedIn  successfully", loggedInUser));
});
// thsi is logout //

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    // maxAge: 24 * 60 * 60 * 1000 // 1 day
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(201, "User LoggedOut  successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  
    const user = await User.findById(decodedToken?._id)
    if(!user){
      throw new ApiError(401, "Invalid Refresh Token");
    }
    if(incomingRefreshToken !== user.refreshToken){
      throw new ApiError(401, "Refresh Token is expired or used!");
    }
  
    const options={
      httpOnly: true,
      secure: true,
      // maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
    const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user._id);
   return res .status(200)
   .cookies("accessToken", accessToken, options)
   .cookies("refreshToken", newRefreshToken, options)
   .json(new ApiResponse(201, "Access Token Refreshed  successfully",accessToken, "newRefreshToken:",newRefreshToken));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
    
  }
});
// Export the registeredUser function

export { registeredUser, loginUser, logoutUser , refreshAccessToken };
