const express = require ('express');
const app = express();
const bp = require('body-parser');
const path = require('path');
const url = require('url');
const apiResult = require('../utils/apiResult.js')
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,auth,Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

// //全局使用use,表示进入所有目标路由前都会先进入过滤器方法
// app.use(filter);
//全局使用body-parser
app.use(bp.urlencoded({extended: false}));
//访问静态资源文件
app.use(express.static(path.join(__dirname, '/')))
const user = require('./user.js');
user.register(app);
const goods = require('./goodslist.js');
goods.goods(app);

module.exports = {
    start(_port = 88){
        app.listen(_port);
    }
}