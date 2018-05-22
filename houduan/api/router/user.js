
var connection = require('../conn/conn.js');
var apiResult = require('../utils/apiResult.js');
var jwt = require('jsonwebtoken');

module.exports = {
    register(app){
        app.get('/getAllUsers',(req,res) => {
            var selSql = "select * from user";
            connection.query(selSql,function(err,result){
                if(err){
                    return;
                }
                res.send(apiResult(result.length > 0,result));
            })
        })

        app.post('/updateUser' , (req,res) => {
            var username = req.body.username;
            var obj = req.body;
            var key = null;
            var values = null;
            for(var item in obj){
                key = item;
                values = obj[item];
            }

            var sql = "update user set "+key+" = '"+values+"' where username = '"+username+"'";
            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                if(result.affectedRows > 0){
                    res.send(apiResult(result.affectedRows > 0))
                }else{
                    res.send(apiResult(result.affectedRows > 0))
                }
                
            })
            

        })

        app.post('/getPageUsers', (req,res) => {

            var num = req.body.num;
            var qty = req.body.qty;
            var sql = "select * from user limit "+num+","+qty;
            var sumSql = "select count(1) from user"
            connection.query(sql,function(err,result){
                if(err){
                    return;
                }
                if(result.length > 0){
                    connection.query(sumSql,function(error,results){
                        res.send(apiResult(result.length > 0, result,results));
                    })
                }
               
            })
        })

        app.post('/delUser',(req,res) => {
           
            var del = req.body.delId;
            var delSql = "delete from user where id = " + del;
            connection.query(delSql,function(err,result){
                if(err){
                    console.log('err===' + err);
                    return;
                }
                if(result.affectedRows > 0){
                    res.send(apiResult(result.affectedRows > 0,{},'success'));
                    return;
                }else{
                    res.send(apiResult(false,{},'error'));
                    return;
                }
            })
        })

        app.post('/getUser',(req,res) => {
            var username  = req.body.username;
            var sql = "select * from user where username = '"+username+"'";
            connection.query(sql,function(err,result){
                if(err){
                    return;
                }
                if(result.length > 0){
                    res.send(apiResult(result.length > 0,result));
                    return;
                }else{
                    res.send(apiResult(false,{},"用户名错误"));
                    return;
                }
            })
        })

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
                    return;
                }
            });
            
        })

        app.post('/weblogin' , (req,res) => {
            var username = req.body.username;
            var password = req.body.password;
            var sql = "select * from webmanage where username='"+username+"' and password = '"+password+"'";
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
                    return;
                }
            });
            
        })

        app.post('/register' , (req,res) => {
            var username = req.body.username;
            var password = req.body.password;
            var str = '0123456789abcdefghijklmnopqrstuvwxyz';
            var nickname = '';
            for(var num = 0; num<4; num++){
                nickname += str.charAt(parseInt(Math.random()*str.length));
            }
            var selSql = "select * from user where username='"+username+"'";
            var  addSql = "insert into user(username,password,nickname) values ('"+username+"','"+password+"','"+nickname+"')";
            connection.query(selSql,function(err,result){
                if(err){
                    return;
                }
                if(result.length > 0){
                    res.send(apiResult(false,{},"用户名已存在"));
                    return;
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