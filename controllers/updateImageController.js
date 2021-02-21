const updateImage = require('../models/updateImage');

const updateImageController = async (req, res) => {
  const { id } = req.params;
  const response = await updateImage(id);
  try {
    return res.status(200).json(response);
  } catch (error) {
    console.log('doh!');
  }
};

module.exports = updateImageController;
