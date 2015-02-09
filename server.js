/**
 * Created by tertis on 15. 2. 10..
 */
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000);