// Function to setup custom logs for the API
async function init() {

  // Returns a promise to be handled by the setup main function
  return new Promise((resolve, reject) => {

    // If there is any error, reject the promise
    try {

      // Saves all the original functionalities of the console
      const BASE_CONSOLE_LOG = console.log;
      const BASE_CONSOLE_ERROR = console.error;
      const BASE_CONSOLE_INFO = console.info;
      const BASE_CONSOLE_TIME = console.time;
      const BASE_CONSOLE_TIME_END = console.timeEnd;

      // Overwrite the original functionalities with custom ones
      // Adds a timestamp to the logs()
      console.log = function(...args) {
        const TIMESTAMP = new Date().toLocaleString('en-US');
        BASE_CONSOLE_LOG('[' + TIMESTAMP + ']', ...args);
      };

      // Adds a timestamp and green color to the success() (new custom function)
      console.success = function(...args) {
        const TIMESTAMP = new Date().toLocaleString('en-US');
        BASE_CONSOLE_LOG('[' + TIMESTAMP + ']\x1b[32m', ...args, '\x1b[0m');
      };

      // Adds a timestamp and red color to the error()
      console.error = function(...args) {
        const TIMESTAMP = new Date().toLocaleString('en-US');
        BASE_CONSOLE_ERROR('[' + TIMESTAMP + ']\x1b[31m', ...args, '\x1b[0m');
      };

      // Adds a timestamp and yellow color to the info()
      console.info = function(...args) {
        const TIMESTAMP = new Date().toLocaleString('en-US');
        BASE_CONSOLE_INFO('[' + TIMESTAMP + ']\x1b[33m', ...args, '\x1b[0m');
      };

      // Changes the time() label to be purple
      console.time = function(label) {
        BASE_CONSOLE_TIME('\x1b[35m' + label + '\x1b[0m');
      };

      // Changes the timeEnd() label to be purple
      console.timeEnd = function(label) {
        BASE_CONSOLE_TIME_END('\x1b[35m' + label + '\x1b[0m');
      }

      console.info("Custom logs created");
      resolve();

    } catch (e) {

      reject(e);

    }

  });
};

//Export the function to the API
module.exports = { init };
