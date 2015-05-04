/**
 * Created by tertis on 15. 2. 15..
 */
var pg = require('pg');
var util = require('util');
// mysql 설정 파일. 커밋은 하지 않는다.
var config = require('./config');
var connectionPool = [];
var connectionUsed = 0;

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
};

exports.AddMarkerData = function(data) {
    // query text 에서 '' 가 매우 중요함. 컬럼에 스트링이 들어가면 해 주어야 한다.
    var queryText = util.format("INSERT INTO markers VALUES ('%s',%s,%s,'%s','%s');",
        data.title, data.locationN, data.locationE, data.description, data.tags);
    var query = connectionPool[connectionUsed].query(queryText);
    query.on('error', function(error) {
        // 에러 발생 시에만 불린다.
        console.log('[DB] AddMarkerData Error...' + error);
    });
}
