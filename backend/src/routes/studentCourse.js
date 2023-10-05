const express = require('express');
const router = express.Router();
const { studentCourseController } = require('../controllers');

router.get('/',  studentCourseController.getStudentCourses);
router.post('/',  studentCourseController.postStudentCourse);

router.get('/:id',  studentCourseController.getStudentCourseById);
router.put('/:id',  studentCourseController.updateStudentCourse);
router.delete('/:id',  studentCourseController.deleteStudentCourse);

module.exports = router;