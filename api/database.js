/**
 * Created by tertis on 15. 2. 15..
 */
var pg = require('pg');
var client = new pg.Client({
    user: 'elhmbhbbdhrzji',
    password: 'HGnMQ_W313nVP4BMmCFpMh65ys',
    database: 'd46qf3m9ubvpcg',
    host: 'ec2-50-17-202-29.compute-1.amazonaws.com',
    port: 5432,
    ssl: true
});

//var client = new pg.Client(connectionStaring);
client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();
    });
});
