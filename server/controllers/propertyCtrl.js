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
    var token = req.body.token;
    var user = jwt.decode(token, config.TOKEN_SECRET);
    db.createProperty([user.sub, req.body.name, req.body.zipcode, req.body.typeId], function(err, propertyId){
      res.status(200).json(propertyId);
    })
  },

  getDefaultTasks: function(req, res){
    db.getDefaultTasks(function(err,defaulttasks){
      res.status(200).json(defaulttasks);
    });
  },

  insertTasks: function(req, res){
    req.body.map(function(task){
      db.insertTasks([task.propertyId,task.day_interval,task.name,task.season,task.outdoor,task.type_id],function(err,success){
      })
    })
    res.sendStatus(201);
  },

  getPropertyTasks: function(req, res){
    db.getPropertyTasks([req.params.propertyId], function(err,propertyTasks){
      res.status(200).json(propertyTasks);
    });
  },



}
