// Import dotenv module to access environment variables
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
// Import mongoose module to connect to MongoDB
import mongoose from "mongoose";
// Get MongoDB URI from environment variables
const mongodb_uri = process.env.MONGODB_URI;
// Import DATABASE_NAME constant from constant.js file
import { DATABASE_NAME } from "../constant.js";

// Function to connect to the database
const databaseconnection = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!mongodb_uri) {
      throw new Error(
        "mongodb_uri is not defined in the environment variables."
      );
    }
    // Connect to the database
    const connectionInstance = await mongoose.connect(
      `${mongodb_uri}/${DATABASE_NAME}`
    );

    console.log(
      `Database connected successfully !! DB HOST: ${connectionInstance.connection.host}`
    );
    // Log success message
  } catch (error) {
    // Log error and exit process
    console.error("Error: Cannot connect to the database. Try again!", error);
    process.exit(1);
  }
};
// Export databaseconnection function
export { databaseconnection };
