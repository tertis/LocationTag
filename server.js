/**
 * Created by tertis on 15. 2. 10..
 */
require(__dirname + '/include');
var express = require('express');
var app = express();
var path = require('path');

// directory를 use해 줘야 angular js의 스크립트가 사용 가능하다.
app.use(express.static(process.env.clientDir));
app.get('*', function(req, res){
    // sendFile은 절대 경로를 사용해야 한다.
    res.sendFile(path.join(process.env.clientDir, 'index.html'));
});

app.listen(process.env.port);
console.log('Start Listen ' + process.env.port);
