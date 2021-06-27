
const mysql=require('mysql');

db=mysql.createPool({
 host:'rm-bp128ud28xq6k4330wo.mysql.rds.aliyuncs.com',
 user:'zhang',
 password:'zJH921616699',
 database:'students_info'
})

module.exports=db;