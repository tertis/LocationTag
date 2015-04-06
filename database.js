/**
 * Created by tertis on 15. 2. 15..
 */
var pg = require('pg');
// mysql 설정 파일. 커밋은 하지 않는다.
var config = require('./config');
var connectionPool = [];


// Create Connection Pool
exports.initialize = function() {
    for (var i = 0; i < config.connPoolCount; ++i ) {
        var connection = new pg.Client(config.pgConn);
        connection.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
            }
            connectionPool.push(connection);
            console.log('[DB] Connection Create...');
        });
    }
    console.log('[DB] Create Connection Pool. Connection ' + config.connPoolCount);
}