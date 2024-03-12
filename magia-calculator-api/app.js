// Dependencies references
const EXPRESS = require('express');
const CORS = require('cors');

// API instancing variables
const API = EXPRESS();
const PORT = 9000;

// Enable CORS on the API
API.use(CORS());

// Setup modules references
const CUSTOM_LOGS = require('./setup/custom_logs.js');
const DATABASE_UPDATE = require('./setup/database_update.js');
const CHARACTERS_LIST = require('./setup/characters_list.js');

// Resource modules references
const STATUS_RESOURCE = require("./resources/status_resource.js");
const CHARACTERS_RESOURCE = require("./resources/characters_resource.js");
const IMAGES_RESOURCE = require('./resources/images_resource.js');

// Resource modules use
API.use('', STATUS_RESOURCE);
API.use('/characters', CHARACTERS_RESOURCE);
API.use('/images', IMAGES_RESOURCE);

// Runs all the required setup functions for the API
async function setup() {

  // Clears the screen
  console.clear();

  // Creates an array to store all the promises
  const SETUP_PROMISES = [];

  // Creates a promise for each setup function and stores them in the array
  const CUSTOM_LOGS_PROMISE = await CUSTOM_LOGS.init();
  SETUP_PROMISES.push(CUSTOM_LOGS_PROMISE);

  const DATABASE_UPDATE_PROMISE = await DATABASE_UPDATE.init();
  SETUP_PROMISES.push(DATABASE_UPDATE_PROMISE);

  const CHARACTERS_LIST_PROMISE = await CHARACTERS_LIST.init();
  SETUP_PROMISES.push(CHARACTERS_LIST_PROMISE);

  // Waits for all the promises
  await Promise.all(SETUP_PROMISES);

};

// Run setup function
setup().then(() => {

  // If there are no problems in the setup, start listening for petitions
  API.listen(PORT, () => {

    console.success("------------------------------------");
    console.success("API running on http://localhost:" + PORT);
    console.success("------------------------------------");

  });

}).catch((e) => {

  // If there is any problem during setup, log it and stop the API
  console.error("ERROR while setting up the API");
  console.error(e);

});
