// Dependencies references
const SQLITE = require('sqlite3');

// Stablishes a connection with the database
const DB = new SQLITE.Database('./database/magia_calculator.db');

// Function to get the database
function get_database() {

  return DB;

};

// Close the database with the API
function close_database() {

  DB.close();

}

module.exports = { get_database, close_database };
