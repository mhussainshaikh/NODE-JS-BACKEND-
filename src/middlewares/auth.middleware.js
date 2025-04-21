import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");
    console.log("Extracted Token:", token);

    if (!token || typeof token !== "string" || token.trim() === "") {
      throw new ApiError(401, "Invalid token - No token found");
    }
    console.log("Type of Token:", typeof token); // Check the type of the token

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(decodedToken);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid token - User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new ApiError(401, error?.message || "Invalid token");
  }
});

export { verifyJWT };
