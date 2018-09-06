// ici on garde les fonctions créées pour récupérer les données, afin de les réutiliser quand on fera les
// jobs le faisant automatiquement

const all_movies_path = "/3/movie/now_playing?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU&page=";

var options = {
    host: "api.themoviedb.org",
    port: 80,
    method: 'GET',
    firstPage: 1,
    lastPage: 40
};

// sert à récupérer les films de themoviedb dans la base locale
function syncGenres() {
    var options = {
        host: "api.themoviedb.org",
        path: "/3/genre/movie/list?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU",
        port: 80,
        method: 'GET',
        firstPage: 1,
        lastPage: 40
    };

    http.request(options, function(res) {
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var data = JSON.parse(body);
            data.genres.forEach(function(genre){
                //console.log(genre);
                if(genre.id){
                    api.actions.genres.createFromApi(genre);
                }
            });
        });
    }).end();
}