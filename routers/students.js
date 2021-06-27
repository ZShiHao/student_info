// 与学生信息相关的路由模块

const express=require('express');
const validate=require('../middleware/studentinfo');
const schema=require('../schema/studentsinfo');
const handler=require('../router_handler/students_handler');
const router=express.Router();

// 获取所有学生信息
router.get('/results',handler.getStudentsInfoHandler);

// 添加学生信息和更细学生信息
router.post('/results',validate.validateMW(schema.studentinfoSchema),handler.insertStudentsInfoHandler);
router.post('/results/update',validate.validateMW(schema.studentinfoSchema),handler.updateStudentsInfoHandler);

// 删除某个学生的信息
router.delete('/results/delete:id',handler.deleteStudentInfoHandler);



module.exports=router;