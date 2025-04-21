import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url //
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url //
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
  // we use name function because in this case we need to use this keyword //
  if (!this.isModified("password")) {
    return next();
  }
  const salt_rounds= process.env.SALT_ROUNDS || 10;
  this.password = await bcrypt.hash(this.password,parseInt(salt_rounds)); // the 10 is default salt for hashing password//
  next(); // we use parseInt for convert string into number //
});
// Method to compare the password with the hashed password
userSchema.methods.ispasswordMatch = async function (password) {
  // we use name function because in this case we need to use this keyword //
  return await bcrypt.compare(password, this.password);
};
// Method to generate an access token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
// Method to generate a refresh token
userSchema.methods.generateRefereshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Export the User model
const User = mongoose.model("User", userSchema);
export { User };
