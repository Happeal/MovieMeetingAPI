const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.meetings.findAll
    );

    router.get('/:id',
        api.actions.meetings.findById);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.meetings.create
    );

    return router;
};