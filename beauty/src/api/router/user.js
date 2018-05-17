
var connection = require('../conn/conn.js');
var apiResult = require('../utils/apiResult.js');
var jwt = require('jsonwebtoken');

module.exports = {
    register(app){
        app.post('/login' , (req,res) => {
            var username = req.body.username;
            var password = req.body.password;
            var sql = "select * from user where username='"+username+"' and password = '"+password+"'";
            connection.query(sql, function (err, result) {
                if(err){
                  return;
                }
                if(result.length > 0){
                    let token = jwt.sign({username},'123',{'expiresIn':60*60*10});
                    res.send(apiResult(result.length > 0,token,result[0]));
                    return;
                }else{
                    res.send(apiResult(false,{},"用户名或密码错误"));
                }
            });
            
        })

        app.post('/register' , (req,res) => {
            var username = req.body.username;
            var password = req.body.password;
            var selSql = "select * from user where username='"+username+"'";
            var  addSql = "insert into user(username,password) values ('"+username+"','"+password+"')";
            connection.query(selSql,function(err,result){
                if(err){
                    return;
                }
                if(result.length > 0){
                    res.send(apiResult(false,{},"用户名已存在"));
                }else{
                    connection.query(addSql,function(error,results){
                        if(error){
                            return;
                        }
                        res.send(apiResult(results.affectedRows == 1,{},"注册成功"));
                        return;
                    })
                }
            })

        })
    }
}