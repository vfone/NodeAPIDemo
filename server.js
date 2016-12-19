// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var fs 				 = require('fs');
// var prependFile = require('prepend-file');
// var FileStreamRotator = require('file-stream-rotator');
var app        = express();
// var morgan     = require('morgan');

var logDirectory = __dirname + '/log';
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
//   flags: 'w',
//   defaultEncoding: 'utf8',
//   fd: 0,
//   mode: 0o666,
//   autoClose: true
// });

// setup the logger
// morgan(format, options)
//app.use(morgan('combined', {stream: accessLogStream}));




// configure app
//app.use(morgan('dev', {stream: accessLogStream})); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var port     = process.env.PORT || 9000; // set our port

// var mongoose   = require('mongoose');
// //mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
// mongoose.connect('mongodb://127.0.0.1:27017/nodeAPI')
// var Bear = require('./app/models/bear');

var config   = require('./app/config/config');
console.log(config.port);

// REGISTER OUR ROUTES -------------------------------
var appRouter   = require('./app/router/router');
app.use('/api', appRouter);

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
