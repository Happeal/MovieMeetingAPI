const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.users.findAll
    );

    router.get('/:id',
        api.actions.users.findById);

    router.post('/',
        //NEED TO ENCRYPT PASSWORD HERE OR BEFORE IN THE APP
        api.middlewares.bodyParser.json(),
        api.actions.users.create
    );

    return router;
};