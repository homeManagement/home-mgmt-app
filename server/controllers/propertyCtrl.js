var app = require('../../server.js');
var jwt = app.get('jwt');
var db = app.get('db');
var config = require('../../config.json');

module.exports ={
  getProperties: function(req, res){
    var token = req.params.token;


    //var user = jwt.decode(token, config.TOKEN_SECRET)
    //console.log(user);
    // db.getProperties(function(err, prop){
    //
    // }
    res.sendStatus(200);
  }

}
