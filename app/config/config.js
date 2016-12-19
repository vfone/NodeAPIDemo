var port       = process.env.PORT || 9000; // set port
var mongoose   = require('mongoose');
var Bear       = require('../models/bear');
var rootPath   = __dirname.substring(0, __dirname.indexOf('/app'));
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
mongoose.connect('mongodb://127.0.0.1:27017/nodeAPI');

module.exports = {
  port:     port,
  Bear:     Bear,
  rootPath: rootPath
};
