var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/env/env');
var mongodb = require('./config/mongodb');
const bookingRoutes = require('./api/booking.routes');

//routes:
var user_routes = require('./api/user.routes');

var app = express();

//Door bodyParser kunnen we de body van een API request gebruiken
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.set('port', (config.env.webPort));
app.set('env', ('development'));

//CORS Headers:
app.use(function (req, res, next) {
    //Deze port mag connecten naar je server:
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', bookingRoutes);

//Default routes:
app.use('*', function(req, res) {
    res.status(400).json({
        'NotFound': 'This URL is not available'
    });
});

app.listen(config.env.webPort, function() {
    console.log('De server luistert op port: ' + app.get('port'));
});

//Als we de endpoints willen testen:
module.exports = app;
