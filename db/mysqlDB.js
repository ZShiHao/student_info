
const mysql=require('mysql');

// 连接阿里云mysql云服务器
db=mysql.createPool({
 host:'rm-bp128ud28xq6k4330wo.mysql.rds.aliyuncs.com',
 user:'zhang',
 password:'zJH921616699',
 database:'students_info'
})

module.exports=db;