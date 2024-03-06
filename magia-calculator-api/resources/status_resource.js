// Dependencies references
const EXPRESS = require('express');

// API reference
const ROUTER = EXPRESS.Router();

// Petition for the web to check if the API is up
// Always sends a 200 response
ROUTER.get("", (req, res) => {
  res.status(200).send();
});

// Export the module to the API
module.exports = ROUTER;
