import mongoose from "mongoose";
const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
        unique: true
    },
    hospitalAddress: {
        type: String,
        required: true,
        enum:[ 'gulshan','johar','saddar','Dha','Bahadurrabad']
    },
    hospitalPhone: {
        type: String,
        required: true
    },
    hospitalEmail: {
        type: String,
        required: true,
        unique: true
    },
    hospitalWebsite: {
        type: String,
        required: true
    },
  hospitaldoctor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  }
}, { timestamps: true });
export const Hospital = mongoose.model("Hospital", hospitalSchema);
