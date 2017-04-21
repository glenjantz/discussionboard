//require express BP path and initialize express
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();
//use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//use client files
app.use(express.static(path.join(__dirname, "./client")));
//use angular files
app.use(express.static(path.join(__dirname, "./bower_components")));
//db connection
require(path.join(__dirname, 'server/config/mongoose.js'));
//server routes
require('./server/config/routes.js')(app);

app.listen(8000, function(){
  console.log('listening on port 8000');
});
