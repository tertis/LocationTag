/**
 * Created by tertis on 15. 2. 10..
 */
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var clientDir = __dirname + '/public';
var db = require('./database');

db.initialize();

// directory를 use해 줘야 angular js의 스크립트가 사용 가능하다.
app.use(express.static(clientDir));
app.get('*', function(req, res){
    // sendFile은 절대 경로를 사용해야 한다.
    res.sendFile(clientDir + '/index.html');
});

app.listen(port);
console.log('Start Listen ' + port);
