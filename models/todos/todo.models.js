import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    sub_todo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sub_Todo",
      },
    ], // array of subtodo
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
