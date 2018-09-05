const express = require('express');
const api = express();

const http = require('http');

require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);

api.listen(8000);

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
syncGenres();
