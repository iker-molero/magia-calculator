// Dependencies references
const AXIOS = require('axios');
const CHEERIO = require('cheerio');

// Enviroment variables references
const URLS = require('../enviroment/urls_list.js');
const { get_database } = require('../utilities/database_connection.js');

// Function to load all the characters in the wiki
async function init() {

  return new Promise(async (resolve, reject) => {

    try {

      // Gets an instance of the database
      const DB = get_database();
      // Gets page data from the wiki (It containts all the character's general data)
      const PAGE_RESPONSE = await AXIOS.get(URLS.characters_list_page);
      // Gets all the characters IDs from the database
      const CHARACTERS_IDS = await new Promise((resolve, reject) => {

        DB.all("SELECT id FROM CHARACTERS_LIST", (e, characters_ids) => {

          if (e) reject(e);
          resolve(characters_ids);

        });

      });

      // Converts the wiki page into a CHEERIO object for easier scraping
      const PAGE_DATA = PAGE_RESPONSE.data;
      const $ = CHEERIO.load(PAGE_DATA);

      // Scrapes the web to get the table containing all the characters
      const CHARACTERS_TABLES = $('table:nth-of-type(2)');
      const ROWS = CHARACTERS_TABLES.find('tr:not(:first-child)');

      // Creates an array of promises to store all the promises while the character is being saved
      const DATA_PROMISES = [];

      // For each character row in the table, create a new promise that runs a function to load the character into the database
      ROWS.each(async (index, character_data_row) => {

        const ROW_PROMISE = await save_character_data(index, character_data_row, $, CHARACTERS_IDS, DB);
        DATA_PROMISES.push(ROW_PROMISE);

      });

      // When all the promises are done, end this function
      await Promise.all(DATA_PROMISES);
      resolve();

    } catch (e) {

      reject(e);

    }

  });

};

// Function to take the table row and save it to the database
async function save_character_data(index, character_data_row, $, characters_ids, DB) {

  return new Promise(async (resolve, reject) => {

    try {

      // Convert the row html into a CHEERIO object
      const CHARACTER_DATA_ROW = $(character_data_row);
      // Iterate through all the sections in the row and store all the values in an array
      const CHARACTER_VALUES = await iterate_character_row(CHARACTER_DATA_ROW, $, characters_ids);

      // If there are values to store, send a query to the database
      if (CHARACTER_VALUES[0] != undefined) {

        // Create a promise with the query of a new insert
        const SQL = "INSERT INTO CHARACTERS_LIST (id, name, attribute, type, starting_rarity, max_rarity, hp, atk, def, release_date, disks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
        const CREATION_PROMISE = new Promise((resolve, reject) => {

          DB.run(SQL, CHARACTER_VALUES, (e) => {

            if (e) reject(e);
            resolve();

          });

        });

        // When the promise is done, end the function
        await CREATION_PROMISE;
        resolve();

      }

    } catch (e) {

      reject(e);

    }

  });

};

// Iterates through all the sections in the character's row, stores them in an array and returns that array
async function iterate_character_row(character_data_row, $, characters_ids) {

  return new Promise((resolve, reject) => {

    try {

      // Creates an empty array
      const CHARACTER_VALUES = [];
      // Set the stop flag to false
      var stop_execution = false;

      // Iterates through the character's row
      character_data_row.find('td').each((index, section) => {

        // If the flag is set to true, stop the code
        if (stop_execution) return;

        // For each 'td' element of the row get the data and add it to the CHARACTER_JSON
        switch (index) {
          case 0: // Gets the character's ID

            // If the character id already exists in the database, set the stop flag to true
            const CHARACTER_ID = section.attributes[0].value;
            if (characters_ids.find((obj) => obj.id == CHARACTER_ID)) stop_execution = true;

            if (!stop_execution) CHARACTER_VALUES.push(Number(CHARACTER_ID));

            break;

          // Skips index 1 because we get in also in index 2 (It's the character's name)
          case 2: // Gets both the character's name and attribute
            const CHARACTER_ATTRIBUTE_W_NAME = section.attributes[0].value; // This string combines the attribute and the name
            // Splits the string into the attribute and the name using regex
            const REGEX_SPLITTER = /^(\S+)\s+(.+)$/;
            const SPLIT_VALUES = CHARACTER_ATTRIBUTE_W_NAME.match(REGEX_SPLITTER);

            const CHARACTER_NAME = SPLIT_VALUES[2];
            const CHARACTER_ATTRIBUTE = SPLIT_VALUES[1];

            CHARACTER_VALUES.push(CHARACTER_NAME);
            CHARACTER_VALUES.push(CHARACTER_ATTRIBUTE);

            break;

          case 3: // Gets the character's type

            // Takes the innerHTML from the element and adds it the the CHARACTER_JSON
            const CHARACTER_TYPE = $(section).html();
            CHARACTER_VALUES.push(CHARACTER_TYPE);

            break;

          case 4: // Gets the character's rarity

            const CHARACTER_RARITIES_W_NAME = section.attributes[0].value; // This string combines the rarities and the name
            // Since we already have the name we can just delete it from the string
            // Trims the string to get rid of the empty spaces at the end
            const CHARACTER_RARITIES = CHARACTER_RARITIES_W_NAME.replace(CHARACTER_VALUES[1], "").trim();
            // Splits the two rarities into its digits
            const SPLIT_RARITIES = CHARACTER_RARITIES.split(" ");

            const CHARACTER_STARTING_RARITY = SPLIT_RARITIES[1];
            const CHARACTER_MAX_RARITY = SPLIT_RARITIES[0];

            CHARACTER_VALUES.push(Number(CHARACTER_STARTING_RARITY));
            CHARACTER_VALUES.push(Number(CHARACTER_MAX_RARITY));

            break;

          case 5: // Gets the character's hp

            const CHARACTER_HP = section.attributes[0].value;
            CHARACTER_VALUES.push(Number(CHARACTER_HP));

            break;

          case 6: // Gets the character's atk 

            const CHARACTER_ATK = section.attributes[0].value;
            CHARACTER_VALUES.push(Number(CHARACTER_ATK));

            break;

          case 7: // Gets the character's def

            const CHARACTER_DEF = section.attributes[0].value;
            CHARACTER_VALUES.push(Number(CHARACTER_DEF));

            break;

          case 8: // Gets the character's release date

            const CHARACTER_DATE_W_ID = section.attributes[0].value; // This string combines the release date and the id
            // Since we already have the id we can just delete it from the string
            // Trims the string to get rid of the empty spaces at the end
            const CHARACTER_DATE = CHARACTER_DATE_W_ID.replace(CHARACTER_VALUES[0], "").trim();
            const CHARACTER_FORMATED_DATE = new Date(CHARACTER_DATE).getTime();
            CHARACTER_VALUES.push(CHARACTER_FORMATED_DATE);

            break;

          case 9: // Gets the character's disks

            // Takes the section an loads it on CHEERIO
            const CHARACTER_DISKS_HOLDER = $(section);
            // Creates the array to add to the CHARACTER_JSON once the disks are populated
            const CHARACTER_DISKS = [];

            const DISK_TYPES = ["Accele", "Blast", "Charge"];

            // Populates the CHARACTER_DISKS array
            // Iterates through all the disks in the CHARACTER_DISKS_HOLDER
            CHARACTER_DISKS_HOLDER.find('a').each((index, disk_element) => {

              // Iterates through all the disk types
              for (let disk_type of DISK_TYPES) {

                // If the disk value contains the disk type, push the disk type to the CHARACTER_DISKS array
                const DISK = disk_element.attributes[0].value;
                if (DISK.includes(disk_type)) CHARACTER_DISKS.push(disk_type);

              }

            });

            CHARACTER_VALUES.push(JSON.stringify(CHARACTER_DISKS));
            break;

          default:

            break;

        };

      });

      // When the iteration loop ends, return the values stored in an array.
      // If the character already exists in the database, the array will be empty
      resolve(CHARACTER_VALUES);

    } catch (e) {

      reject(e);

    }

  });

};

//Export the function to the API
module.exports = { init };
