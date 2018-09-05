const express = require('express');
const api = express();

const http = require('http');

require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);

api.listen(8000);

function getJSON(options, cb){
    http.request(options, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var data = JSON.parse(body);
            api.actions.movies.createFromApi(data);
            console.log(data);
        });
    }).end();
}

var options = {

    host: "api.themoviedb.org",
    port: 80,
    path: "/3/movie/500664?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU",
    method: 'GET'

};

getJSON(options, function(err, result){
    if(err){
        return console.log('Error while trying to get data : ', err);
    }
    //console.log(result);
});
