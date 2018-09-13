const express = require('express');
const api = express();
var redisClient  =  require("redis").createClient();
var session      =  require('express-session');
var redisStore   =  require('connect-redis')(session);


// à mettre avant d'affecter les routes, sinon pas utilisé
api.use(session({
    secret: 'pouet',
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl:  260}),
    saveUninitialized: false,
    resave: false
}));

require("./api/middlewares")(api);
require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);


api.listen(8000);


