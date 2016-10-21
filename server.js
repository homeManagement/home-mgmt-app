var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');
var jwt = require('jwt-simple');
var config = require('./config.json');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./public'))

app.listen(config.port, function(){
  console.log('listening on port' + config.port)
})
