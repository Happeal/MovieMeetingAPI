const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.movies.findAll
    );

    router.get('/:id',
        api.actions.movies.findById);

    router.post('/', (req, res) => {
        api.middlewares.bodyParser.json(),
        api.actions.sessions.create
    });

    return router;
};