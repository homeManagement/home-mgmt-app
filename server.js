var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');
var moment = require('moment');
var jwt = require('jwt-simple');
var request = require('request');
var config = require('./config.json');
var connectionstring = config.connectionString;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./public'));

var massiveInstance = massive.connectSync({connectionString:connectionstring})

app.set('db', massiveInstance);
var db = app.get('db');

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  console.log('hit ensure authenticated');
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}



/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function(req, res) {
  console.log('Hit get /api/me');
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
  console.log('Hit put /api/me');
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});

/*
 |--------------------------------------------------------------------------
 | Sign Up with Email
 |--------------------------------------------------------------------------
 */

app.post('/auth/signup', function(req, res){
  db.getLocalUser([req.body.email], function(err, user){
    if(user[0]){
    return res.status(409).send({message: 'Email is already taken'})
    }
    db.createLocalUser([req.body.first_name, req.body.last_name, req.body.email, req.body.password], function(err,success){
      db.getLocalUser([req.body.email], function(err, existingUser) {
          var token = createJWT(existingUser);
          return res.send({ token: token });
        });
    });
  })
})

/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function(req, res) {
  console.log(req.body);
  db.getLocalUser([req.body.email], function(err, user){
    console.log('xyxyxyxyxyx',user[0]);
    if (!user[0]){
      return res.status(401).send({message: 'Invalid email and/or password'});
    }
    if (req.body.password !== user[0].password){
      return res.status(401).send({message: 'Invalid email and/or password'});
    }
    res.send({ token: createJWT(user[0]) });
  })
  // User.findOne({ email: req.body.email }, '+password', function(err, user) {
  //   if (!user) {
  //     return res.status(401).send({ message: 'Invalid email and/or password' });
  //   }
  //   user.comparePassword(req.body.password, function(err, isMatch) {
  //     if (!isMatch) {
  //       return res.status(401).send({ message: 'Invalid email and/or password' });
  //     }
  //     res.send({ token: createJWT(user) });
  //   });
  // });
});


/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */

 app.post('/auth/facebook', function(req, res) {
   var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
   var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
   var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
   var params = {
     code: req.body.code,
     client_id: req.body.clientId,
     client_secret: config.FACEBOOK_SECRET,
     redirect_uri: req.body.redirectUri
   };
   // Step 1. Exchange authorization code for access token.
   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
     if (response.statusCode !== 200) {
       return res.status(500).send({ message: accessToken.error.message });
     }
     // Step 2. Retrieve profile information about the current user.
     request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
       if (response.statusCode !== 200) {
         return res.status(500).send({ message: profile.error.message });
       }
       if (req.header('Authorization')) {
         console.log('AUTHORIZATION DDDDD',profile.id)
         db.getUser([profile.id] , function(err, existingUser) {
           if (existingUser[0]) {
             return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
           }
           var token = req.header('Authorization').split(' ')[0];

          //  console.log(token, config.TOKEN_SECRET);
           var payload = jwt.decode(token, config.TOKEN_SECRET);
           console.log(payload);
          //  User.findById(payload.sub, function(err, user) {
          //    if (!user) {
          //      return res.status(400).send({ message: 'User not found' });
          //    }
          //    user.facebook = profile.id;
          //    user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
          //    user.displayName = user.displayName || profile.name;
          //    user.save(function() {
          //      var token = createJWT(user);
          //      res.send({ token: token });
          //    });
          //  });
         });
       } else {
         console.log('LLLLLLLLŁ',profile)
         // Step 3. Create a new user account or return an existing one.
         db.getUser([profile.id], function(err, existingUser) {
           if (existingUser[0]) {
             var token = createJWT(existingUser);
             return res.send({ token: token });
           }
           db.createUser([profile.id, profile.first_name, profile.last_name, profile.email,'https://graph.facebook.com/' + profile.id + '/picture?type=large'], function(err,success){
             db.getUser([profile.id], function(err, existingUser) {
                 var token = createJWT(existingUser);
                 return res.send({ token: token });
               });
           });
         });
       }
     });
   });
 });

/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */

app.listen(config.port, function(){
  console.log('listening on port' + config.port)
});
