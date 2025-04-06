
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadfilesoncloudinary = async (localfilespath) => {
  try {
    if (!localfilespath) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const response = await cloudinary.uploader.upload(localfilespath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully //
    console.log("file has been uploaded successfully",response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilespath); /// removed the locally saved temporaray files
  }
};
