// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: './uploads', // Folder to save uploaded files
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// File filter to check the file type
function fileFilter(req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject file
  }
}

// Set up multer for file upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: fileFilter
});

module.exports = upload;
