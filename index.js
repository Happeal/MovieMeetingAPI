const express = require('express');
const api = express();

require("./api/routes")(api);


api.listen(8000);