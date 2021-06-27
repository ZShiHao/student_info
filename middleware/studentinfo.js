// 用户信息相关的中间件


module.exports.validateMW=(schema)=>{
 // 验证表单是否符合schema自定义的规则
 return (req,res,next)=>{
  const {error,value}=schema.validate(req.body);
  if(error){
   // 验证不通过,抛出错误
   throw error
  }else{
   // 验证通过,继续执行下一个中间件
   next()
  }
 }
}