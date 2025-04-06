import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    qualifications:{
        type:String,
        required:true,
        enum:['MBBS','MD','MS','FRCS','PHD','MPHILL']
    },
    specializations:{
        type:String,
        required:true,
        enum:['Cardiology','Neurology','Orthopedics','Pediatrics','Dermatology','Ophthalmology']
    },
     operatein:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
     }
},
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
