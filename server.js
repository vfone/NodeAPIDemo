// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var fs 				 = require('fs');
var prependFile = require('prepend-file');
var FileStreamRotator = require('file-stream-rotator');
var app        = express();
var morgan     = require('morgan');

var logDirectory = __dirname + '/log';
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: 0,
  mode: 0o666,
  autoClose: true
});

// setup the logger
// morgan(format, options)
app.use(morgan('combined', {stream: accessLogStream}));




// configure app
//app.use(morgan('dev', {stream: accessLogStream})); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 9000; // set our port

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
mongoose.connect('mongodb://127.0.0.1:27017/nodeAPI')
var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	//write to access log
	var now = new Date;
	var zeroPrefix = function(num){
		return num<10?'0'+num:num;
	}

	var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var fullDate = now.getUTCFullYear() + '-' + Months[now.getUTCMonth()] + '-' + zeroPrefix(now.getUTCDate());
	var utcTime = fullDate + '   ' + zeroPrefix(now.getUTCHours()) + ':' + zeroPrefix(now.getUTCMinutes()) + ':' + zeroPrefix(now.getUTCSeconds()) + ' (UTC)';

	prependFile(__dirname + '/log/access-'+fullDate+'.log', utcTime + '\n' + req.method + ': ' + req.headers.host + req.originalUrl + '  | statusCode: ' + res.statusCode + '\n==========/\/\=========== \n\r', function (err) {
	});

	// do logging
	console.log('do logging.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});


	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
