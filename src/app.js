import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser({ sameSite: "none", secure: true }));
app.use(express.static("public"));


// routes import ///
import {router} from "./routes/user.router.js";

//routes declaration//
app.use('/api/v1/users', router)  // ✅ Correct with leading slash
//         ^
// This slash is critical!//router is in ./routes/user.router.js
// http://localhost:3000/api/v1/users//