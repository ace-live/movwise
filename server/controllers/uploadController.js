const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db');

// Ensure the uploads folder exists
const uploadFolder = 'uploads';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname)); // Ensure unique filenames
  }
});

const upload = multer({ storage: storage });

// Upload file handler (exports)
exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;

  try {
    // Optionally save file path to DB (this assumes an 'uploads' table in your DB)
    await pool.query('INSERT INTO uploads (filepath) VALUES ($1)', [filePath]);

    res.json({
      message: 'File uploaded and path saved to DB',
      filePath: filePath
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export multer middleware for usage in routes
exports.upload = upload;
