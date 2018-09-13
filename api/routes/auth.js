const router = require('express').Router();

module.exports = (api) => {
    router.post('/', 
        api.middlewares.bodyParser.json(),
        api.actions.auth.connect
    );

    return router;
};