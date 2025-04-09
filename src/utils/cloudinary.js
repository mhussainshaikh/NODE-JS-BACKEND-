
// import the cloudinary library and the fs library
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configure the cloudinary library with the cloud name, api key, and api secret from the environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

 // define an async function to upload files to cloudinary
 const uploadfilesoncloudinary = async (localfilespath) => {
  try {
    // check if there are any files to upload
    if (!localfilespath) {
      // if there are no files, return a 400 status code with a message
      return res.status(400).json({ message: "No files uploaded" });
    }
    // upload the files to cloudinary
    const response = await cloudinary.uploader.upload(localfilespath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully //
    console.log("file has been uploaded successfully",response.url);
    // return the response from cloudinary
    return response;
  } catch (error) {
    // if there is an error, remove the locally saved temporary files
    fs.unlinkSync(localfilespath); /// removed the locally saved temporaray files
    // return null
    return null;
  }
};
// export the function
export { uploadfilesoncloudinary };