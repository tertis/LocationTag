/**
 * Created by tertis on 15. 2. 10..
 */
var express = require('express');
var path = require('path');
var app = express();

app.get('*', function(req, res){
    // sendFile은 절대 경로를 사용해야 한다.
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000);