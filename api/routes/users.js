const router = require('express').Router();

module.exports = (api) => {

    /**
    * @api {get} /users/ get all users
    * @apiPrivate
    * @apiName findAllUsers
    * @apiGroup user
    * 
    * @apiSuccess {User[]} users All the users.
    */
    router.get('/',
        api.actions.users.findAll
    );

    /**
    * @api {get} /users/:id get user by id
    * @apiName findUserById
    * @apiGroup user
    * 
    * @apiParam {Integer} id  the user's id.
    * 
    * @apiSuccess {User} user The user with the given id.
    */
    router.get('/:id',
        api.actions.users.findById);

    /**
    * @api {post} /movies/ create a new user
    * @apiName createUser
    * @apiGroup user
    * 
    * @apiParam {Integer} TODO.
    * 
    * @apiSuccess {Movie} movie The movie with the given id.
    */
    router.post('/',
        //NEED TO ENCRYPT PASSWORD HERE OR BEFORE IN THE APP
        api.middlewares.bodyParser.json(),
        api.actions.users.create
    );

    return router;
};