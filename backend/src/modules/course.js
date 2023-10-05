const { Course, Student, sequelize, StudentCourse } = require("../models");

const createCourse = async (body) => {
  const course = await Course.create(body);
  return course;
};
const getAllCourses = async () => {
  const courses = await Course.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(DISTINCT student_id ) FROM StudentCourses WHERE course_id = Courses.id)`
          ),
          "student_count",
        ],
      ],
    },
    include: [
      {
        model: Student,
        as: "students", // use the alias name "students"
        attributes: [],
      },
    ],
  });

  return courses;
};
const getCourseById = async (id) => {
  const course = await Course.findOne({
    where: {
      id: id,
    },
  });
  return course;
};
const getCourseWithStudentsById = async (id) => {
  const course = await Course.findOne({
    where: {
      id: id,
    },
    include: {
      model: Student,
      as: "students", // use the alias name "students"
      through: {
        model: StudentCourse,
        attributes: [],
      },
      attributes: ["id", "name"], // add additional student attributes as needed
    },
  });
  return course;
};
const updateCourse = async (id, body) => {
  const course = await Course.update(
    {
      ...body,
      updated_at: new Date(),
    },
    {
      where: {
        id: id,
      },
    }
  );
  return course;
};

const deleteCourse = async (id) => {
  const course = await Course.destroy({
    where: {
      id: id,
    },
  });
  return course;
};

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  getCourseWithStudentsById,
  updateCourse,
  deleteCourse,
};
