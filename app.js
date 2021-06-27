
const express=require('express');
const studentRouter=require('./routers/students');
const config=require('./config');
const joi=require('joi');
const db=require('./db/mysqlDB');
const { ValidationError, object } = require('joi');

const app=express();

// 解码请求体中的数据
app.use(express.urlencoded({extended:false}));


// 响应错误信息中间件
app.use(function(req,res,next){
 // 为res对象挂载一个错误处理函数
 res.errHandler=(err,status=1)=>{
  res.send({
   status,
   message: err instanceof object ? err.message:err
  })
 };
 next();
})



app.use('/my',studentRouter);

// 服务器错误处理中间件
app.use(function (err,req,res,next) {
 if(err instanceof ValidationError) return res.errHandle(err);
 console.log(err);
 res.errHandler('发生未知错误!');
})

// 判断数据库是否运行成功
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
 if (error) throw error;
 console.log('The solution is: ', results[0].solution);
});

app.listen(config.port,()=>{
 console.log('server already running');
})