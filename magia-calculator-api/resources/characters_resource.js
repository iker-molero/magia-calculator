// Dependecies references
const EXPRESS = require('express');

// Utilities references
const { get_database } = require('../utilities/database_connection.js');

// API reference
const ROUTER = EXPRESS.Router();

// Petition to get all the characters in the DB
// Returns them in a JSON format
ROUTER.get("/all", (req, res) => {
  // Gets an instance of the database
  const DB = get_database();

  // Gets all the data from the characters table
  const SQL = "SELECT * FROM CHARACTERS_LIST"
  DB.all(SQL, (err, data) => {

    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Send the JSON data to the web
    res.json(data);

  });
});

// Export the module to the API
module.exports = ROUTER;
