// 学生信息数据验证规则
const joi=require('joi');

module.exports.studentinfoSchema=joi.object({
 id:joi.number().integer().min(1),
 name:joi.string().min(1).max(5).required(),
 subject:joi.string().min(2).max(10).required(),
 age:joi.number().integer().greater(10).less(70).required(),
 gender:joi.string().min(1).max(1).required(),
 degree:joi.string().min(1).required()
})