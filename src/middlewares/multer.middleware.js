import multer from "multer";
import path from "path"; // it is by default in nodejs so we cant install it//
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save files to /public/temp relative to current file
    cb(null, path.join(__dirname, "../../public/temp"));
  },
  filename: function (req, file, cb) {
    // Save the file with its original name
    cb(null, file.originalname);
  },
});

// Create multer upload instance
const upload = multer({ storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
 });

export { upload };
