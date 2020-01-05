const multer = require("multer");
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
//       cb(new Error("file not supported"), false);
//       return
//     }
//     cb(null, true);
//   }
// });
const Datauri = require("datauri");
const path = require("path");
const dUri = new Datauri();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const dataUri = req =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
module.exports = { multerUploads, dataUri };
