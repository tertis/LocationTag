/**
 * Created by tertis on 15. 2. 10..
 */
var express = require('express');
var path = require('path');
var app = express();
var database = require( __dirname + '/api/database');

var clientDir = path.join(__dirname, 'public');
var port = 3000;

// directory를 use해 줘야 angular js의 스크립트가 사용 가능하다.
app.use(express.static(clientDir));
app.get('*', function(req, res){
    // sendFile은 절대 경로를 사용해야 한다.
    res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(port);
console.log('Start Listen ' + port);