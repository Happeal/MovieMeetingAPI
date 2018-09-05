module.exports = (api) => {

    const Movie = api.models.Movie;


    function create(req, res, next) {

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

    return {
        create
    };
};