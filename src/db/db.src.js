import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant.js";
export const databaseconnection = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    // Connect to the database
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DATABASE_NAME}`
    );

    // Log success message
    console.log(
      `Database connected successfully !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log error and exit process
    console.error("Error: Cannot connect to the database. Try again!", error);
    process.exit(1);
  }
};
