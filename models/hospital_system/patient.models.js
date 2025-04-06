import mongoose from "mongoose";
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    }, // enum is used to restrict the value of the field
    address: {
      type: String,
      required: true,
    },
    bloodgroups: {
      type: String,
      required: true,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", "Unknown"],
    },
    admittedin: {
      type: mongoose.Schema.Types.ObjectId, // this is used to reference the hospital model
      ref: "Hospital",
    },
  },
  { timestamps: true }
);
export const Patient = mongoose.model("Patient", patientSchema);
