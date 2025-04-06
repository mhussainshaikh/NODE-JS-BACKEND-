import mongoose from "mongoose";
const sub_todoSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  },
  { timestamps: true }
);
export const Sub_Todo = mongoose.model("Sub_Todo", sub_todoSchema);
