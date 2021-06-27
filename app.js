const express=require('express');
const cors=require('cors');
const multer=require('multer'); 
const studentRouter=require('./routers/students');
const config=require('./config');
const joi=require('joi');
const db=require('./db/mysqlDB');
const { ValidationError, object } = require('joi');

const upload = multer({ dest: 'uploads/' });
const app=express();

// 解码请求体中url-encode类型的数据
app.use(express.urlencoded({extended:false}));

// 托管静态资源
app.use(express.static('./static'));
app.use('/node_modules',express.static('./node_modules'));

// 解析multipart类型的数据
app.use(upload.none());

// 实现跨域
app.use(cors());

// 响应错误信息中间件
app.use(function(req,res,next){
 // 为res对象挂载一个错误处理函数
 res.errHandler=(err,status=1)=>{
  res.send({
   status,
   message: err instanceof Object ? err.message:err
  })
 };
 next();
})

// 为学生信息相关的接口,挂载前缀,作为有权限的接口
app.use('/my',studentRouter);

// 服务器错误处理中间件
app.use(function (err,req,res,next) {
 if(err instanceof ValidationError) return res.errHandler(err);
 res.errHandler('发生未知错误!');
})

// 判断数据库是否运行成功
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
 if (error) throw error;
 console.log('The solution is: ', results[0].solution);
});

app.listen(config.port,()=>{
 console.log('Server already running');
})