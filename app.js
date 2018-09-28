const express = require('express');
const app = express();

const https = require("https");
var fs = require("fs");
const options = {
    key: fs.readFileSync("/home/rmfvg5/server/encryption/server.key"),
    cert: fs.readFileSync("/home/rmfvg5/server/encryption/ryanfilkins.site.crt"),
    ca: fs.readFileSync("/home/rmfvg5/server/encryption/intermediate.crt")
};

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

var routes = require('./routes.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app', {useNewUrlParser: true}).catch(function(error){
    console.log("Error connecting to MongoDB: " + error);
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(upload.array());

app.use('/', routes);

https.createServer(options, app).listen(3000);