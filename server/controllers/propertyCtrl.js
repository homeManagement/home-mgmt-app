var app = require('../../server');
var jwt = require('jwt-simple');
var config = require('../../config.json');
var db = app.get('db');


module.exports ={

  getProperties: function(req, res){
    var token = req.params.token;
    var user = jwt.decode(token, config.TOKEN_SECRET);

    db.getProperties([user.sub], function(err, prop){
      res.status(200).json(prop);
    })
  },

  createProperty: function(req, res){
    db.createProperty([req.body.userId, req.body.name, req.body.zipcode, req.body.typeId], function(err, propertyId){
      res.status(200).json(propertyId);
    })
  }



}
