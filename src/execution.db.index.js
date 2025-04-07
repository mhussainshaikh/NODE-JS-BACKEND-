import dotenv from "dotenv"
// Load environment variables from the .env file
dotenv.config(
  {
    path: "../.env"
  }
);
// Import the database connection from the db folder
import { databaseconnection } from "./db/db.src.js"; 
// Import the app from the app.js file
import { app } from "./app.js";

 // Set the port to the value of the PORT environment variable or 4000 if it is not set
 const port = process.env.PORT || 4000;

// Connect to the database
databaseconnection() 
  .then(() => {
    // Start the server on the specified port
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // Log an error if the database connection fails
    console.log(`Error connecting to the database: ${err}`);
  });
