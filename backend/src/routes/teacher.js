const express = require('express');
const router = express.Router();
const { teacherController } = require('../controllers');

router.get('/',  teacherController.getTeachers);
router.post('/',  teacherController.createTeacher);

router.get('/:id',  teacherController.getTeacherById);
router.put('/:id',  teacherController.updateTeacher);
router.delete('/:id',  teacherController.deleteTeacher);

module.exports = router;