const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
        api.actions.meetings.findAll
    );

    router.get('/:id',
        api.actions.meetings.findById);

    /**
     * @api {post} /meetings/for/:filmId create a new meeting
    * @apiName createMeeting
    * @apiGroup meeting
    *
    * @apiHeader {String} x-api-key User's authentication token.
    * 
    * @apiParam {Integer} filmId The movie the people of the group want to see.
    * @apiParam {String} description In the body, describes where to watch the movie and other details.
    * @apiParam {String} meetingDate In the body, in the format YYYY-MM-DD HH:MM
    */
    router.post('/for/:filmId',
        api.middlewares.tokenValidator,
        api.middlewares.bodyParser.json(),
        api.actions.meetings.create
    );

    return router;
};