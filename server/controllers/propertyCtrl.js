var app = require('../../server');
var jwt = require('jwt-simple');
var config = require('../../config.json');
var db = app.get('db');


module.exports = {

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
      db.createPropertySettings([propertyId[0]["id"]], function(err,success){
        res.status(200).json(propertyId);
      })
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

  insertCustomTask: function(req, res){
    db.insertCustomTask([req.body.propertyId,req.body.name,req.body.dayInterval,req.body.season,req.body.notes,req.body.outdoor,req.body.lastDate],function(err,success){
      res.status(200).json(success);
    })
  },

  updatePropertySettings: function(req, res){
    console.log(req.params);
    db.updatePropertySettings([req.body.text, req.body.email, req.body.weather, req.params.propertyId], function(){
      res.status(200).json('success');
    })
  },

  getPropertySettings: function(req, res){
    db.getPropertySettings([req.params.propertyId], function(err, propertySettings){
      res.status(200).json(propertySettings);
    })
  },

  done: function(req, res){
    if (req.body.alertid){
      db.resetLastDate([req.params.propertymaintenanceid], function(err, success){
        db.deleteAlert([req.body.alertid], function(err, success){
          res.status(200).json(success);
        })
      })
    }
    else {
      db.resetLastDate([req.params.propertymaintenanceid], function(err, success){
        res.status(200).json(success);
      })
    }
  },

  snooze: function(req, res) {
    console.log(req.params.alertid);
    db.snoozeAlert([req.params.alertid], function(err, success) {
      res.status(200).json(success);
    })
  },

  deleteProperty: function(req,res){
    db.deletePropertyAlerts([req.params.propertyId],function(err,success){
      db.deletePropertySettings([req.params.propertyId],function(err,success){
        db.deletePropertyTasks([req.params.propertyId],function(err,success){
          db.deleteProperty([req.params.propertyId],function(err,success){
            res.sendStatus(201);
          })
        })
      })

    })
  },

  getUserById: function(req, res){
    var token = req.params.token;
    var user = jwt.decode(token, config.TOKEN_SECRET);

    db.getUserById([user.sub], function(err, users){

      res.status(200).json(users);

    })
  },

  updateFirstName: function(req,res){
    console.log("body",req.body);
    db.updateFirstName([req.params.id, req.body.newFirstName], function(err, success){
        res.status(200).json(success);
    })

  }



}
