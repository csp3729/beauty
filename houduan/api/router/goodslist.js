var jwt = require('jsonwebtoken');
var connection = require('../conn/conn.js');
var apiResult = require('../utils/apiResult.js');

const filter = (req,res,next) => {
    let token = req.headers['auth'];
    if(!token){
        res.send(apiResult(false,{},'unauth'))
    }else{
        jwt.verify(token,'123',(error,result) => {
            if(error){
                res.send(apiResult(false,error,'unauth'))
            }else{
                next();
            }
        })
    }
}

module.exports = {
    goods(app){
        app.get('/getAllGoods',(req,res) => {
            var sql = "select * from goodslist";
            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                // console.log(result);

                res.send(apiResult(result.length > 0,result));
            })
        })

        app.post('/getPageGoods',(req,res) => {
            var num = req.body.num;
            var qty = req.body.qty;
            var sql = "select * from goodslist limit "+num+","+qty;
            var sumSql = "select count(1) from goodslist";
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

        app.post('/addToCar',filter,(req,res) => {
            var username = req.body.username;
            var color = req.body.color;
            var qty = req.body.qty*1;
            var path = req.body.path;
            var goodsname = req.body.goodsname;
            var prices = req.body.prices;
            var collection = req.body.collection;
            var size = req.body.size;
            var selSql = "select * from shopcar where goodsname = '"+goodsname+"' and username = '"+username+"' and color = '"+color+"' and size = '"+size+"'";
            var qtySql = "select qty from shopcar where goodsname = '"+goodsname+"' and username = '"+username+"'";
            var sql = "insert into shopcar(username,color,qty,path,goodsname,prices,collection,size) values ('"+username+"','"+color+"',"+qty+",'"+path+"','"+goodsname+"',"+prices+","+collection+",'"+size+"')";
            connection.query(selSql,function(err,resultes){
                if(err){
                    console.log("err===");
                    return;
                }
                if(resultes.length > 0){
                    connection.query(qtySql,function(err,resu){
                        var num = resu[0].qty*1;
                        qty = qty + num;
                        var updateSql = "update shopcar set qty = "+qty+" where username = '"+username+"' and goodsname = '"+goodsname+"'";

                        connection.query(updateSql,function(err,results){
                            if(err){
                                console.log("err===" + err);
                                return;
                            }
                            res.send(apiResult(results.affectedRows>0,{},'success'));
                        })
                    })
                }else{
                    connection.query(sql,function(err,result){
                        if(err){
                            console.log("err===" + err);
                            return;
                        }
                        if(result.affectedRows > 0){
                            res.send(apiResult(result.affectedRows > 0,{},"success"));
                        }else{
                            res.send(apiResult(false));
                        }
                    })
                }
            })

        })

        app.post('/dimSelect', (req,res) => {
            var keyword = req.body.keyword;
            var selSql = "select * from goodslist where describes like '%"+keyword+"%'";
            connection.query(selSql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                res.send(apiResult(result.length > 0,result));
            })
        })
        
        app.post('/addGoods', (req,res) => {
            var goodsname = req.body.goodsname;
            var path = req.body.path;
            var sales = req.body.sales;
            var prices = req.body.prices;
            var collection = req.body.collection;
            var describes = req.body.describes;
            var addSql = "insert into goodslist(goodsname,path,sales,prices,collection,describes) values ('"+goodsname+"','"+path+"','"+sales+"','"+prices+"','"+collection+"','"+describes+"')";
            connection.query(addSql,function(err,result){
                if(err){
                    console.log("err==="+err);
                    return;
                }
                if(result.affectedRows > 0){
                    res.send(apiResult(result.affectedRows > 0,{},"success"));
                }
            })
        })

        app.post('/delGoods', (req,res) => {

            var del = req.body.delId;
            var delSql = "delete from goodslist where id = "+del;
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

    
        app.post('/getCars',filter,(req,res) => {
            var username = req.body.username;
            var sql = "select * from shopcar where username = '"+username+"'";
            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                res.send(apiResult(result.length > 0,result));
            })
        })

        app.post('/updateGoods',(req,res) => {
            var id = req.body.id;
            var qty = req.body.qty;
            var sql = "update shopcar set qty = "+qty+" where id = "+id;
            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                if(result.affectedRows > 0){
                    res.send(apiResult(result.affectedRows > 0));
                }else{
                    res.send(apiResult(result.affectedRows > 0));
                }
            })
        })

        app.post('/deleteCarGood', (req,res) => {
            var obj = req.body;
            var array = [];
            for(var key in obj){
                array.push(obj[key]);
            }
           var sql = "delete from shopcar where id in (";
           for(var i = 0; i < array.length; i++){
                if(i == array.length-1){
                    sql = sql + array[i] + ")";
                    break;
                }
                sql = sql + array[i] + ",";
           }

            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                if(result.affectedRows > 0) {
                    res.send(apiResult(result.affectedRows > 0));
                }else{
                    res.send(apiResult(result.affectedRows > 0));
                }
            })
        })

        app.get('/getPics',(req,res) => {
            var sql = "select * from headPic";
            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                // console.log(result);

                res.send(apiResult(result.length > 0,result));
            })
        })

        app.post('/getAllOrder', (req,res) => {
            var username = req.body.username;
            var sql = "select * from goodorder where username = '"+username+"'";
            connection.query(sql,function(err,result){
                if(err){
                    console.log("err===" + err);
                    return;
                }
                res.send(apiResult(result.length > 0,result));
            })
        })
    }
}