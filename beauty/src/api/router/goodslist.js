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
            var prices = req.body.prices;
            var addSql = "insert into goodslist(goodsname,prices) values ('"+goodsname+"','"+prices+"')"
            connection.query(addSql,function(err,result){
                if(err){
                    console.log("err==="+err);
                    return;
                }
                console.log(result);
                if(result.affectedRows > 0){
                    res.send(apiResult(result.affectedRows > 0,{},"success"));
                }
            })
        })

        app.post('/delGoods', (req,res) => {
            var del = req.body.del;
            del = Number(del);
            var delSql = "delete from goodslist where id = "+del;
            console.log(delSql);
            connection.query(delSql,function(err,result){
                if(err){
                    console.log("err==="+err);
                    return;
                }
                console.log(result);
            })

        })
    }
}