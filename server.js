/**
 * Created by tertis on 15. 2. 10..
 */
var express = require('express');
var url = require('url') ;
var app = express();

var port = process.env.PORT || 3000;
var clientDir = __dirname + '/public';
var db = require('./database');

db.initialize();

// directory를 use해 줘야 angular js의 스크립트가 사용 가능하다.
app.use(express.static(clientDir));
app.get('/', function(req, res){
    // sendFile은 절대 경로를 사용해야 한다.
    res.sendFile(clientDir + '/index.html');
});

app.get('/add', function(req, res){
    var queryObject = url.parse(req.url,true).query;
    console.log(queryObject);
    db.AddMarkerData(queryObject);
    res.send();

});

app.get('/load', function(req, res){
    var queryObject = url.parse(req.url,true).query;
    db.LoadMarkerData(queryObject, res);
})

app.listen(port);
console.log('Start Listen ' + port);
