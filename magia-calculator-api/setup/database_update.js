// Dependencies references
const FS = require('fs');

// Enviroment variables references
const { get_database } = require('../utilities/database_connection.js');

// Function to create all the needed tables for the database
async function init() {

  return new Promise(async (resolve, reject) => {

    try {

      // Gets an instance of the database
      const DB = get_database();
      // Reads the file that stores all the needed tables
      const TABLES_FILE = await new Promise((resolve, reject) => {

        FS.readFile('./database_tables.txt', 'utf-8', (e, tables_file) => {

          if (e) reject(e);
          resolve(tables_file);

        });

      });

      // Gets an array of lines from that file
      const FILE_LINES = TABLES_FILE.split('\n');

      // Create variables that store the parameters of the table
      var table_name = "";
      var table_columns = [];

      // Iterates through all the lines of the file
      FILE_LINES.forEach((line) => {

        // Removes the \r at the end of the lines
        line = line.replace('\r', '');

        if (line.startsWith("+")) { // If the line starts with "+" it is the table's name

          line = line.replace('+', '');
          table_name = line;
          table_columns = [];

        } else if (line.startsWith("-")) { // If the line starts with "-" it is the table's name

          line = line.replace('-', '');
          table_columns.push(line);

        } else if (line == '*') { // If the line is "*" create the table with the parameters loaded before

          const SQL = "CREATE TABLE IF NOT EXISTS " + table_name + " (" + table_columns + ");"
          DB.run(SQL);

        };

      });

      console.info("Database updated");
      resolve();

    } catch (e) {

      reject(e);

    }

  });

};

// Exports the function to the API
module.exports = { init };
