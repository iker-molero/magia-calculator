// Dependencies references
const CRYPTO = require('crypto');

// Function to return the MD5 hashed input
function get_hash(input_string) {

  // Create a MD5 hash
  const MD5_HASH = CRYPTO.createHash('md5');

  // Update the hash with the given input
  MD5_HASH.update(input_string);

  // Turn the MD5 hash into a hex string and return it
  const RESULT = MD5_HASH.digest('hex');
  return RESULT;

}

// Export modules to the API
module.exports = { get_hash };
