const express = require('express');
const api = express();


require("./api/middlewares")(api);
require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);


//api.middlewares.syncData.syncGenres();


api.listen(8000);


