module.exports = (api) => {
    
    const Genre = api.models.Genre;

    function findAll(req, res, next) {

        console.log("Start getting all genres");
        Genre.findAll().then(function(genres) {
            if(genres[0] == null) {
                return res.status(204).send(genres)
            }
            return res.send(genres);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findById(req, res, next) {

        Genre.findAll({
            where: {
                idGenre: req.id
            },
            order: [['start', 'DESC']]
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function createFromApi(data){
        if(data.length < 1){
            console.log("400");
            process.exit();
        }

        let genre = Genre.build(data);
        genre.save().then()
        .catch(function(error) {
            console.log(error);
            process.exit();
        })
    }

    return {
        createFromApi,
        findAll,
        findById
    };
};