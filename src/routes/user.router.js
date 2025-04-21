import Router from "express";
import { loginUser, logoutUser, refreshAccessToken, registeredUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Register route with file upload handling using multer
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",     // single avatar image
      maxCount: 1,
    },
    {
      name: "coverImage", // single cover image (optional)
      maxCount: 1,
    },
  ]),
  registeredUser
);
router.route("/login").post(loginUser);

// secured routes//
router.route("/logout").post(verifyJWT,logoutUser);

router.route("/refreshtoken").post(refreshAccessToken)
export { router };
