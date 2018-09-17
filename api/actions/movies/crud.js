module.exports = (api) => {

    const Movie = api.models.Movie;

    function findAll(req, res, next) {

        console.log("Start getting all movies");
        Movie.findAll().then(function(movies) {
            if(movies[0] == null) {
                return res.status(204).send(movies)
            }
            return res.send(movies);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findById(req, res, next) {
        //console.log(api.middlewares.tokenValidator);
        Movie.findAll({
            where: {
                idMovie: req.params.id
            },
            order: [['idMovie', 'DESC']]
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
        
        let movies  = req.body;
        if (movies.length < 1) {
            return res.send(412);
        }
            //sessions['id_user'] =  req.idUser;
            
            let movie = Movie.build(movies);
            movie
                .save()
                .then()
                .catch(function(error) {
                return res.status(500).send(error)
            });
            console.log("oklm");
        return res.send(201);
    }

    function createFromApi(data){
        let movies = data;

        if(movies.length < 1){
            //return res.send(412);
            console.log("400");
            process.exit();
        }

        let movie = Movie.build(movies);

        movie
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
    function findAllWithRelation(req, res, next) {

        api.mysql.query("SELECT * " +
            "   FROM movie" +
            "   WHERE c.idProfile = m.idProfile ",
           /* "FROM missions m " +
            "  LEFT JOIN profiles as p ON p.id = m.idProfile " +
            "WHERE m.state = 'En Attente'" +
            " OR (m.updatedAt <= CURRENT_TIMESTAMP - INTERVAL 10 MINUTE and m.state = 'Valid')" +
            "ORDER BY m.severity DESC"*/
            { model: api.models.MissionCons }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    return {
        create,
        createFromApi,
        findAll,
        findById
    };
};