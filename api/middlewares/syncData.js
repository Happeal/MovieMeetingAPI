// ici on garde les fonctions créées pour récupérer les données, afin de les réutiliser quand on fera les
// jobs le faisant automatiquement
module.exports = (api) => {
    const all_movies_path = "/3/movie/now_playing?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU";
    const all_genres_path = "/3/genre/movie/list?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU";

    var options = {
        host: "api.themoviedb.org",
        path: all_movies_path,
        port: 80,
        method: 'GET',
        firstPage: 1,
        lastPage: 40
    };

    function syncFilms(){
        for(var i = options.firstPage; i < options.lastPage; i++){
            var  reqpath = pathToFetch;
            reqpath += i;

            options.path = reqpath;
            console.log(reqpath);
            http.request(options, function(res){
            
                var body = '';
        
                res.on('data', function(chunk){
                    body += chunk;
                });
        
                res.on('end', function(){
                    var data = JSON.parse(body);
        
                    data.results.forEach(function(movie){
                    // console.log(movie.id);
                        if(movie.id){
                            api.actions.movies.createFromApi(movie);
                        }
                    });
        
                // api.actions.movies.createFromApi(data);
            
                    
            
                    //console.log(data.results);
                });
            }).end();
        }
    }

    // sert à récupérer les films de themoviedb dans la base locale
    function syncGenres() {

        http.request(options, function(res) {
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var data = JSON.parse(body);
                data.genres.forEach(function(genre){
                    console.log(genre);
                    if(genre.id){
                        api.actions.genres.createFromApi(genre);
                    }
                });
            });
        }).end();
    }
    return {
        syncFilms,
        syncGenres
    };
};