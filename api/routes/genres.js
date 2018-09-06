const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.genres.findAll
    );

    router.get('/:id',
        api.actions.genres.findById);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.genres.create
    );

    return router;
};