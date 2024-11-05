const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");

// function that calculates the size of a picture
function getImageDetails(filename) {
  const filePath = path.join(__dirname, "..", "public", "images", filename);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const stats = fs.statSync(filePath);

  const dimensions = sizeOf(filePath);

  return {
    url: `http://localhost:3001/images/${filename}`,
    size: stats.size,
    dimensions,
  };
}

module.exports = { getImageDetails };
