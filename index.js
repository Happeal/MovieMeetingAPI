const express = require('express');
const api = express();

const http = require('http');

require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);

api.listen(8000);

// remplir la abse de films
const all_movies_path = "/3/movie/now_playing?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU";

var options = {
    host: "api.themoviedb.org",
    path: all_movies_path,
    port: 80,
    method: 'GET',
    firstPage: 1,
    lastPage: 40
};

function getJSON(options, cb){
    var body = '';

    http.request(options, function(res){
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var data = JSON.parse(body);
            for (let i = 0; i < 10000; i++) {
                data.results.forEach(function(movie){
                    console.log(movie.id);
                    if(movie.id){
                        api.actions.movies.createFromApi(movie);
                    }
                });
            }
        });
    }).end();
}

getJSON(options, function(err, result){
    if(err){
        return console.log('Error while trying to get data : ', err);
    }
    //console.log(result);
});
