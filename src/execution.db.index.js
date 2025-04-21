// Import the database connection from the db folder
import { databaseconnection } from "./db/db.src.js";
// Import the app from the app.js file
import { app } from "./app.js";

// Set the port to the value of the PORT environment variable or 4000 if it is not set
const port = process.env.PORT || 4000;

// Connect to the database //
databaseconnection()
  .then(() => {
    // Start the server on the specified port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
