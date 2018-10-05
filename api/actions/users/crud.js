module.exports = (api) => {

    const User = api.models.User;

    function findAll(req, res, next) {

        console.log("Start getting all movies");
        User.findAll().then(function(users) {
            if(users[0] == null) {
                return res.status(204).send(users)
            }
            return res.send(users);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findById(req, res, next) {
        console.log(req.user);
        User.findAll({
            where: {
                idUser: req.params.id
            },
            order: [['idUser', 'DESC']]
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findBuddys(req, res, next) {
        console.log("start look for buddys");

        return api.mysql.transaction(function (t) {
            // create the meeting
            return Meeting.g({
              description: req.body.description,
              meetingDate: req.body.meetingDate, // TODO inexact en bdd (-2h)
              idMovie:     req.params.filmId
            }, {transaction: t})
            // add the current user to the created meeting
            .then(function (createdMeeting) {
                return UserMeeting.create({
                    idMeeting: createdMeeting.idMeeting,
                    idUser: req.user.idUser
                }, {transaction: t})
                
                .then(function(){

                }, {transaction: t});
            });


        }).then(function (result) {
            return res.status(201); // TODO si possible renvoyer le meeting avec liste d'utilisateurs
        }).catch(function (err) {   // peut-être en utilisant l'action de findMeetingById
            return res.status(500).send(err)
        });
    }



    function create(req, res, next) {
        console.log(req.body);
        if (!req.body.pseudo) {
            return res.status(412).send("You must provide a pseudo");
        }
        if (!req.body.password) {
            return res.status(412).send("You must provide a password");
        }
        req.body.encryptedPassword = req.body.password;
        let user = User.build(req.body);
        user
            .save()
            .then(function(createdUser) {
                return res.send(201);
            })
            .catch(function(error) {
                if (error.name = "SequelizeUniqueConstraintError") {
                    return res.status(400).send("Pseudo already taken.")
                } else {
                    return res.status(500).send(error)
                }
            });
    }

    function createFromApi(data){
        let users = data;

        if(users.length < 1){
            //return res.send(412);
            console.log("400");
            process.exit();
        }

        let user = Movie.build(users);

        user
        .save()
        .then()
        .catch(function(error) {
                console.log(error);
                console.log("500");
                process.exit();
            
        });

        console.log("oklm");
        console.log("201");  
        
    }

    return {
        create,
        createFromApi,
        findAll,
        findBuddys,
        findById
    };
};