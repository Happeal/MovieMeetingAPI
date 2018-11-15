// ici on garde les fonctions créées pour récupérer les données, afin de les réutiliser quand on fera les
// jobs le faisant automatiquement
module.exports = (api) => {
    const all_movies_path = "/3/discover/movie?api_key=" + api.settings.apikey + "&language=fr-EU&sort_by=popularity.desc&include_adult=false&include_video=false&page=";
    const all_genres_path = "/3/genre/movie/list?api_key=" + api.settings.apikey + "&language=fr-EU";
    const latestMoviePath = '/3/movie/latest?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU';
    const currentMoviesPath = '/3/movie/now_playing?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU';

    const http = require('http');

    var options = {
        host: "api.themoviedb.org",
        path: "",
        port: 80,
        method: 'GET',
        firstPage: 1,
        lastPage: 10
    };

    function syncLastestMovie(){
        options.path = latestMoviePath;
        http.request(options, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var data = JSON.parse(body);
                api.actions.movies.createFromApi(data);
                //console.log(data);
            });
        }).end();
    }

    function syncCurrentMovies(){
        options.path = currentMoviesPath;
        http.request(options, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var data = JSON.parse(body);
                api.actions.movies.createManyFromApi(data.results);
                //console.log(data);
            });
        }).end();
    }

    // sert à récupérer les films de themoviedb dans la base locale
    function syncGenres() {

        options.path = all_genres_path;
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

        return;
    }
    return {
        syncLastestMovie,
        syncCurrentMovies,
        syncGenres
    };
};