var sequelize = require('sequelize');

module.exports = (api) => {

    const Meeting = api.models.Meeting;
    const UserMeeting = api.models.UserMeeting;
    const Movie = api.models.Movie;

    function findAll(req, res, next) {

        console.log("Start getting all movies");
        Meeting.findAll().then(function(meetings) {
            if(meetings[0] == null) {
                return res.status(204).send(meetings)
            }
            return res.send(meetings);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findById(req, res, next) {
        console.log(req.params.id);
        Meeting.findById(req.params.id, {
            include: [Movie]
        })
        .then(function(anotherTask) {
            console.log(anotherTask);
            if (anotherTask == null){
                console.log(anotherTask);
                return res.status(404).send("Meeting not found");
            } else {
                console.log(anotherTask);
                return res.status(200).send(anotherTask);
            }
        }).catch(function(error) {
            console.log(error.message);
            return res.status(500).send(error)
        });

    }

    function create(req, res, next) {
        console.log("start create a meeting");

        // verify parameters are provided
        if (req.body.description == null) {
            return res.status(412).send("You must provide a description.");
        }
        if (req.body.meetingDate == null) {
            return res.status(412).send("You must provide a meetingDate.");
        }

        return api.mysql.transaction(function (t) {
            // create the meeting
            return Meeting.create({
              description: req.body.description,
              meetingDate: req.body.meetingDate, // TODO inexact en bdd (-2h)
              idMovie:     req.params.filmId
            }, {transaction: t})
            // add the current user to the created meeting
            .then(function (createdMeeting) {
                return UserMeeting.create({
                    idMeeting: createdMeeting.idMeeting,
                    idUser: req.user.idUser
                }, {transaction: t});
            });
        }).then(function (result) {
            return res.status(201); // TODO si possible renvoyer le meeting avec liste d'utilisateurs
        }).catch(function (err) {   // peut-être en utilisant l'action de findMeetingById
            return res.status(500).send(err)
        });
    }

    function createFromApi(data){
        let meetings = data;

        if(meetings.length < 1){
            //return res.send(412);
            console.log("400");
            process.exit();
        }

        let meeting = Meeting.build(meetings);

        meeting
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
        findById
    };
};