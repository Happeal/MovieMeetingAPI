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

        console.log("start create movie");
        
        let meetings  = req.body;
        if (meetings.length < 1) {
            return res.send(412);
        }
            //sessions['id_user'] =  req.idUser;
            
            let meeting = Meeting.build(meetings);
            meeting
                .save()
                .then()
                .catch(function(error) {
                return res.status(500).send(error)
            });
            console.log("oklm");
        return res.send(201);
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