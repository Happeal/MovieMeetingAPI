module.exports = (api) => {
    const Genre = api.models.Genre;

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
        createFromApi
    };
};