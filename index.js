const express = require('express');
const api = express();

const http = require('http');

require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);

api.listen(8000);

function getJSON(options, cb){

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

var pathToFetch = "/3/movie/now_playing?api_key=0f07d15f3bf7ad7df9f70d81f66e1861&language=fr-EU&page=";

var options = {

    host: "api.themoviedb.org",
    port: 80,
    path: pathToFetch,
    method: 'GET',
    firstPage: 1,
    lastPage: 40

};

/*getJSON(options, function(err, result){
    if(err){
        return console.log('Error while trying to get data : ', err);
    }
    //console.log(result);
});*/
