// Setting up server 
var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanstacktutorials');


var port = process.env.PORT || 8000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));



app.listen(port);
console.log("The app is currently listening to " + port);


todoController(app);

