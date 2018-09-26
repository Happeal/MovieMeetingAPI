const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.middlewares.tokenValidator,
        api.actions.movies.findAll
    );

    router.get('/:id',
        api.middlewares.tokenValidator,
        api.actions.movies.findById);

    router.post('/',
        api.middlewares.tokenValidator,
        api.middlewares.bodyParser.json(),
        api.actions.movies.create
    );

    return router;
};