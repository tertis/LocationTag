/**
 * Created by tertis on 15. 2. 15..
 */
var mysql = require('mysql');
// mysql 설정 파일. 커밋은 하지 않는다.
var config = require('./config');
var connectionPool = [];

// Create Connection Pool
exports.initialize = function() {
    for (var i = 0; i < config.connPoolCount; ++i ) {
        var connection = mysql.createConnection(config.connData);
        connectionPool.push(connection);
    }

    console.log('[DB] Create Connection Pool.');
}