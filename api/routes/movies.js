const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.movies.findAll
    );

    router.get('/:id',
        api.actions.movies.findById);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.movies.create
    );

    return router;
};