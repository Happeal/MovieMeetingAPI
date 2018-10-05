module.exports = (api) => {

    const Movie = api.models.Movie;


    function findAll(req, res, next) {
        let page_num = 1; // first page by default
        if (req.query.page != null) {
            page_num = parseInt(req.query.page);
        }
        let nb_movies = 10; // 10 movies per page by default
        if (req.query.nb != null) {
            nb_movies = parseInt(req.query.nb);
        }

        console.log("Start getting", nb_movies, "movies");
        let nb_skip = (page_num - 1) * nb_movies;

        Movie.findAll({
            limit: nb_movies,
            offset: nb_skip
        })
        .then(function(movies) {
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
        var sqlQuery = "SELECT *" +
        "  FROM mydb.Movie" +
        "  WHERE idMovie = " + req.params.id;

        sqlQuery += checkFilter(req.query);
        

        sqlQuery += " ORDER BY idMovie DESC ";
        
        api.mysql.query(sqlQuery,
        { model: api.models.Movie }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }



    function findByName(req, res, next) {
        //console.log(api.middlewares.tokenValidator);
        var sqlQuery = "SELECT *" +
        "  FROM mydb.Movie" +
        "  WHERE title LIKE '" + req.params.name + "%'";

        sqlQuery += checkFilter(req.query);
      

        sqlQuery += " ORDER BY idMovie DESC ";
        
        api.mysql.query(sqlQuery,
         { model: api.models.Movie }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function checkFilter(query){
       
        var sqlQuery = "";

        if(query.adult){
            sqlQuery +=  " AND adult = " + query.adult;
        }
        if(query.original_language){
            sqlQuery += " AND original_language = '" + query.original_language + "'";
        }

        return sqlQuery;
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
        findById,
        findByName
    };
};