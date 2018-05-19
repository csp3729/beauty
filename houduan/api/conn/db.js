var connection = require('./conn.js');
var apiResult = require('../utils/apiResult.js');

 module.exports = {
    select(username){
        var sql = "select * from user where username = 'admin'" ;
        console.log(888)
        console.log(sql)
        connection.query(sql, function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
           // console.log(result);
           // console.log(apiResult(result.length > 0))

            return apiResult(result.length > 0);
    });
    }
}