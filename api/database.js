/**
 * Created by tertis on 15. 2. 15..
 */

var DB_conn = {
    user: 'elhmbhbbdhrzji',
    password: 'HGnMQ_W313nVP4BMmCFpMh65ys',
    database: 'd46qf3m9ubvpcg',
    host: 'ec2-50-17-202-29.compute-1.amazonaws.com',
    port: 5432,
    ssl: true
};
var pg = require('pg');
var client = new pg.Client(DB_conn);

pg.connect(DB_conn, function(err, client) {
    var query = client.query('SELECT * FROM test');

    query.on('row', function(row) {
        console.log(JSON.stringify(row));
    });
});