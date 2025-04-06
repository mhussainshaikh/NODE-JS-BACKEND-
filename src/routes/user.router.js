import { Router } from "express"; // it is similar like import express from 'express' //
import { registeredUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
export const router = Router(); // const app = express();//
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registeredUser
); // it is in user.controllers.js//
