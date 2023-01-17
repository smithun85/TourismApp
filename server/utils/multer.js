// we require cloudinary and connect our API credentials from the .env file.
//We need to set up multer to facilitate file upload.

// const multer = require("multer");
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");

// const storage = cloudinaryStorage({

//   //The ‘folder’ property will be created in your Cloudinary account if it does not exist already
// folder: "TourImages",    

// //The ‘allowedFormats” will ensure only “.jpg”, "jpeg" and “.png” files are uploaded.
// allowedFormats: ["jpg", "png", "jpeg"],
// //or
// //   allowedFormats: (req, file, cb) => {
// //     let ext = path.extname(file.originalname);
// //     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
// //       cb(new Error("Unsupported file type!"), false);
// //       return;
// //     }
// //     cb(null, true);

// //The ‘transformation’ property sets your images to the same size.
// transformation: [{
// width: 500,
// height: 500,
// crop: "limit"
// }],
// cloudinary: cloudinary
// });

// //multer can be used in the post route as a middleware.
// module.exports = multer({storage: storage});



//or

const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});


