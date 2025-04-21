//  this is the real world example of backend api ///

// import express from "express";

// const port = process.env.PORT || 4000;
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Home route
// app.get("/home", (req, res) => {
//   try {
//     const homepage = [
//       {
//         title: "Home",
//         description: "Welcome to our homepage",
//       },
//     ];

//     res.status(200).json({
//       success: true,
//       data: homepage,
//       code: 200, // automaticaly converts into json
//     });
//   } catch (error) {
//     console.error("Error in /home route:", error);

//     res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       code: 500,
//     });
//   }
// });

// // Contact route
// app.get("/contact", (req, res) => {
//   try {
//     const contactpage = [
//       {
//         title: "Contact",
//         description: "Get in touch with us",
//       },
//     ];

//     res.status(200).json({
//       success: true,
//       data: contactpage,
//       code: 200,
//     });
//   } catch (error) {
//     console.error("Error in /contact route:", error);

//     res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       code: 500,
//     });
//   }
// });
// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// this is the simple backend api ///

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

// // we use async await  and fetch when backend api get data from external api (third party api)  or database //

// import express from "express";
// import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' });

// const app = express();
// const port = process.env.PORT || 3000;

// app.get("/price", async (req, res) => {
//   try {
//     const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`error ${response.status}`);
//     }

//     const data = await response.json();
//     res.status(200).json({
//      message: "success",
//       data: data,
//       code: 200,
//     });
//   } catch (err) {
//     console.log(err, "error");
//     res.status(500).json({
//       message: err.message,
//       code: 500,
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });

// //  frontend example // Same example with async/await//

// const getData=async function () {
//     try {
//       const url='https://randomuser.me/api'
//       const response = await fetch(url);
//   //Check if the response is successful//

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   getData(); //

// //just like backend make the api and frontend just req and get the url example https:localhost:3000/api/data to get the data of /data from backend api //

// similarly in third party api backend api will get the data from third party api and send it to frontend //

// we use fetch and async await in backend api to get data from  third part api similarly to frontend ///

