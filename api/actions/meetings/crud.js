module.exports = (api) => {

    const Meeting = api.models.Meeting;

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
        Meeting.findAll({
            where: {
                idMeeting: req.params.id
            },
            order: [['idMeeting', 'DESC']]
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function create(req, res, next) {
        console.log("start create a meeting");

        // verify all parameters are provided
        if (req.body.description == null) {
            return res.status(412).send("You must provide a description.");
        }
        if (req.body.meetingDate == null) {
            return res.status(412).send("You must provide a meetingDate.");
        }

        // create meeting
        let meeting = Meeting.build();
        meeting.description = req.body.description;
        meeting.meetingDate = req.body.meetingDate; // TODO inexact en bdd (-2h)
        meeting.idMovie = req.params.filmId;
        meeting
            .save()
            .then(function(createdMeeting) {
                // put our user in the created meeting
                return res.status(201).send(createdMeeting);
            })
            .catch(function(error) {
                return res.status(500).send(error)
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