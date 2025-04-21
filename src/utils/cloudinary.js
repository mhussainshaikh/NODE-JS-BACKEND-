// Import the Cloudinary library and the fs module
import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";


// Configure the Cloudinary library with the provided environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define an asynchronous function to upload files to Cloudinary
const uploadfilesoncloudinary = async (localfilespath) => {
  try {
    // Check if a file path is provided
    if (!localfilespath) {
      throw new Error("No file path provided");
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localfilespath, {
      resource_type: "auto",
    });

    // Log a success message and delete the temporary file
    console.log("✅ Uploaded successfully:", response.secure_url);
    fs.unlinkSync(localfilespath); // delete temp file
    return response;
  } catch (error) {
    // Log an error message and delete the temporary file if it exists
    console.error("❌ Cloudinary upload error:", error.message);
    if (fs.existsSync(localfilespath)) {
      fs.unlinkSync(localfilespath);
    }
    throw new Error("Failed to upload file to Cloudinary");
  }
};

// Export the uploadfilesoncloudinary function
export { uploadfilesoncloudinary };
