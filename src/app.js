// import express module
import express from "express";
// import cookie-parser module
import cookieParser from "cookie-parser";
// import cors module
import cors from "cors";
// create an instance of express
const app = express();

// use cors middleware with options
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// use express.json middleware with options
app.use(express.json({ limit: "16kb" }));
// use express.urlencoded middleware with options
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// use cookie-parser middleware with options
app.use(cookieParser({ sameSite: "none", secure: true }));
// use express.static middleware with options
app.use('/static',express.static("public"));

// routes import ///
// import router from user.router.js
import { router } from "./routes/user.router.js";
//routes declaration//
// use router with leading slash
app.use("/api/v1/users", router); // ✅ Correct with leading slash

// This slash is critical!//router is in ./routes/user.router.js
// http://localhost:3000/api/v1/users//
// export app
export { app };
