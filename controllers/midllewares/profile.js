const multer = require("multer");
const path = "./assets/profile";

module.exports = {
  upload() {
    const fileStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
    return (upload = multer({ storage: fileStorage }));
  },
};
