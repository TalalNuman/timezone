const { TeacherCourse, Teacher, Course } = require("../models");

// Function to create a teacher course record
const createTeacherCourse = async (teacherId, courseId) => {
  const teacherCourse = await TeacherCourse.create({
    teacher_id: teacherId,
    course_id: courseId,
  });

  return teacherCourse;
};

// Function to get all teacher course records
const getAllTeacherCourses = async () => {
  const teacherCourses = await TeacherCourse.findAll({
    include: [Teacher, Course],
  });
  return teacherCourses;
};

// Function to get a teacher course record by id
const getTeacherCourseById = async (id) => {
  const teacherCourse = await TeacherCourse.findByPk(id, {
    include: [Teacher, Course],
  });
  return teacherCourse;
};

// Function to update a teacher course record by id
const updateTeacherCourse = async (teacherCourse, teacherId, courseId) => {
  if (teacherId) {
    teacherCourse.teacher_id = teacherId;
  }
  if (courseId) {
    teacherCourse.course_id = courseId;
  }

  await teacherCourse.save();

  return teacherCourse;
};

// Function to delete a teacher course record by id
const deleteTeacherCourse = async (teacherCourse) => {
  await teacherCourse.destroy();
};

const deleteTeacherCourseByTeacherId = async (teacherId) => {
  const teacherCourses = await TeacherCourse.destroy({
    where: {
      teacher_id: teacherId,
    },
  });
};
const deleteTeacherCourseByCourseId = async (courseId) => {
  const teacherCourses = await TeacherCourse.destroy({
    where: {
      course_id: courseId,
    },
  });
};

module.exports = {
  createTeacherCourse,
  getAllTeacherCourses,
  getTeacherCourseById,
  updateTeacherCourse,
  deleteTeacherCourse,
  deleteTeacherCourseByTeacherId,
  deleteTeacherCourseByCourseId,
};
