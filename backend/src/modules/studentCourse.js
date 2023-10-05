const { StudentCourse, Student, Course } = require("../models");

// Function to create a student course record
const createStudentCourse = async (studentId, courseId) => {
  const studentCourse = await StudentCourse.create({
    student_id: studentId,
    course_id: courseId,
  });

  return studentCourse;
};

// Function to get all student course records
const getAllStudentCourses = async () => {
  const studentCourses = await StudentCourse.findAll({
    include: [Student, Course],
  });
  return studentCourses;
};

// Function to get a student course record by id
const getStudentCourseById = async (id) => {
  const studentCourse = await StudentCourse.findByPk(id, {
    include: [Student, Course],
  });
  return studentCourse;
};

// Function to update a student course record by id
const updateStudentCourse = async (studentCourse, studentId, courseId) => {
  if (studentId) {
    studentCourse.student_id = studentId;
  }
  if (courseId) {
    studentCourse.course_id = courseId;
  }

  await studentCourse.save();

  return studentCourse;
};

// Function to delete a student course record by id
const deleteStudentCourse = async (studentCourse) => {
  await studentCourse.destroy();
};
const deleteStudentCourseByStudentId = async (studentId) => {
  await StudentCourse.destroy({
    where: {
      student_id: studentId,
    },
  });
};
const deleteStudentCourseByCourseId = async (courseId) => {
  await StudentCourse.destroy({
    where: {
      course_id: courseId,
    },
  });
};

module.exports = {
  createStudentCourse,
  getAllStudentCourses,
  getStudentCourseById,
  updateStudentCourse,
  deleteStudentCourse,
  deleteStudentCourseByStudentId,
  deleteStudentCourseByCourseId,
};
