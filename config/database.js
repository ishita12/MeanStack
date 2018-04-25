const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports = {
 database: 'mongodb://127.0.0.1:27017/meanDB',
 secret: crypto

}
