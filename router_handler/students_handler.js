// 学生信息相关的路由处理函数

// 处理函数:获取学生信息
module.exports.getStudentsInfoHandler=(req,res)=>{
 // TODO:获取所有的学生信息
 const sqlStr='select * from students ';
 db.query(sqlStr,(err,results)=>{
  if(err) throw err
  if(results.length==0) return res.errHandler('获取学生信息失败!');
  res.send({
   status:0,
   message:'获取学生信息成功!',
   data:results
  })
 })
}

// 处理函数:插入学生信息
module.exports.insertStudentsInfoHandler=(req,res)=>{
 // 用户提交的数据通过验证
 // TODO:向数据库中插入新的数据
 const sqlStr='insert into students set ?';
 db.query(sqlStr,req.body,(err,results)=>{
  if(err) throw err
  if(results.affectedRows!=1) return res.errHandler('插学生信息失败!');
  res.send({
   status:0,
   message:'插入学生信息成功!'
  })
 })
}

// 处理函数:更新学生信息
module.exports.updateStudentsInfoHandler=(req,res)=>{
 // 用户提交的数据通过验证
 // TODO:将更新的数据提交到mysql数据库中
 const sqlStr='update students set ? where id=?';
 const {id,...columns}=req.body;
 db.query(sqlStr,[columns,id],(err,results)=>{
  if(err) throw err
  if(results.affectedRows!=1) {
   return res.errHandler('更新学生信息失败!');
  }
  res.send({
   status:0,
   message:'更新学生信息成功!'
  })
 })
}

// 处理函数:删除某个学生的信息
module.exports.deleteStudentInfoHandler=(req,res)=>{
 // TODO:在数据库中删除某个学生的信息
 // tips:实际开发不会用delete语句,一般用update更新数据中的status字段
 const sqlStr='delete from students where id=?';
 db.query(sqlStr,req.params.id,(err,results)=>{
  if(err) throw err;
  if(results.affectedRows!=1) return res.errHandler(err);
  res.send({
   status:0,
   message:'删除学生信息成功!'
  })
 })
}