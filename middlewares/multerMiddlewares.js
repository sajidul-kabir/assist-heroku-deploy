const multer = require("multer");

//multer/image uploading middleware
exports.multerFunc = (folder) => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `img/${folder}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${folder}-${req.user.id}-${Date.now()}.${ext}`);
    },
  });
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  return upload;
};
