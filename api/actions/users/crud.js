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
        console.log(req.params.id);
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

    function create(req, res, next) {
        let users  = req.body;
        if (users.length < 1) {
            return res.send(412);
        }   
        let user = User.build(users);
        user
            .save()
            .then()
            .catch(function(error) {
                return res.status(500).send(error)
            });
        return res.send(201);
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
        findById
    };
};