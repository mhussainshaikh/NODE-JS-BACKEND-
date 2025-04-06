import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // Set the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Corrected: file.originalname
  }
});

export const upload = multer({ storage: storage });
