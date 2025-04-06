import { databaseconnection } from "./db/db.src.js"; // Import the database connection function
import { app } from "./app.js";

import dotenv from "dotenv"; // Import and configure dotenv to load environment variables from a .env file //
dotenv.config({
  path: "../.env",
});
 // we write this after that we can get any variable from .env file by write process.env.PORT or MONGODB_URI

 const port = process.env.PORT || 4000;

databaseconnection() // Call the function to connect to the database
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
  });
