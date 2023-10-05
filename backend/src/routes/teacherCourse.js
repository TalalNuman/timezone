const express = require('express');
const router = express.Router();
const { teacherCourseController } = require('../controllers');

router.get('/',  teacherCourseController.getTeacherCourses);
router.post('/',  teacherCourseController.postTeacherCourse);

router.get('/:id',  teacherCourseController.getTeacherCourseById);
router.put('/:id',  teacherCourseController.updateTeacherCourse);
router.delete('/:id',  teacherCourseController.deleteTeacherCourse);

module.exports = router;