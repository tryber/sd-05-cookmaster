const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'image',
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
