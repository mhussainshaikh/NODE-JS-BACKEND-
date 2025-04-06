import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      Boolean: true,
      unique: true,
    },
    todo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sub_Todo",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
