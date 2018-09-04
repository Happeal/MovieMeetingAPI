const router = require('express').Router();

module.exports = (api) => {

    router.get('/', (req, res) => {
        res.status(200).json({
            message: "Handling GET requests to /movies"
        });
    });

    return router;
};