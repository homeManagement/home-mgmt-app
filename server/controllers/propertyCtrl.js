var app = require('../../server');
var jwt = require('jwt-simple');
var config = require('../../config.json');
var db = app.get('db');


module.exports ={

  getProperties: function(req, res){
    var token = req.params.token;
    var user = jwt.decode(token, config.TOKEN_SECRET);
//console.log(app.get('db'));
    db.getProperties([user.sub], function(err, prop){
      res.status(200).json(prop);
  })

  }



}
