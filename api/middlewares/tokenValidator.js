var jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {

  var token = req.headers['x-api-key'];
  if (token) {

    jwt.verify(token, api.settings.security.salt, function(err, user) {
        if (err) {
            return res.json({"error": true, "message": 'Failed to authenticate token.' });
        }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).send("no token provided.");
  }
}