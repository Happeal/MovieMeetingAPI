const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.movies.findAll
    );

    router.post('/', (req, res) => {
        res.status(200).json({
            message: "Handling POST requests to /movies" 
        });
    });

    return router;
};