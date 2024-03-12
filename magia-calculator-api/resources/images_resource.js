// Dependencies references
const EXPRESS = require('express');
const AXIOS = require('axios');
const SHARP = require('sharp');

// Enviroment variables references
const URLS = require('../enviroment/urls_list.js');

// Utilities references
const { get_hash } = require('../utilities/md5_hash.js');

// API reference
const ROUTER = EXPRESS.Router();

ROUTER.get("/icon/:character_name", async (req, res) => {

  try {

    // Format the character name for the URL
    const FORMATED_CHARACTER_NAME = req.params.character_name.replace(/\s/g, "_");
    // Add .png at the end of the name
    const FILE_NAME = FORMATED_CHARACTER_NAME + ".png";
    // Hash the file name to get the path to the image
    const HASHED_NAME = get_hash(FILE_NAME);
    // Create an array for all the needed part for the URL
    const IMAGE_URL_PARTS = [
      URLS.images_api_base_url,
      HASHED_NAME[0],
      HASHED_NAME.substring(0, 2),
      FILE_NAME,
    ]
    // Build the URL with the parts array
    const IMAGE_URL = IMAGE_URL_PARTS.join("/");
    console.log(IMAGE_URL);
    // Load the image with AXIOS
    const IMAGE = await AXIOS.get(IMAGE_URL, { responseType: 'arraybuffer' });
    // Resize the image with SHARP
    const RESIZED_IMAGE = await SHARP(IMAGE.data)
      .resize({ width: 200, height: 200 })
      .toBuffer();
    // Set the response type to .png
    res.contentType("image/png");
    // Send the resized image in .png format to the web
    res.end(RESIZED_IMAGE, 'binary');

  } catch (e) {

    // Send an error response if anything failed
    res.status(500).send("There was an error with the URL, please check the API");

  }

});

// Export the modules to the API
module.exports = ROUTER;
