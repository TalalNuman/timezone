const { Teacher, Course, TeacherCourse, sequelize } = require("../models");

const createTeacher = async (body) => {
  const teacher = await Teacher.create(body);
  return teacher;
};
const getAllTeachers = async () => {
  const teachers = await Teacher.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(DISTINCT course_id) FROM TeacherCourses WHERE teacher_id = Teachers.id)`
          ),
          "course_count",
        ],
      ],
    },
    include: [{ model: Course, as: "courses", attributes: [] }],
  });

  return teachers;
};
const getTeacherById = async (id) => {
  const teacher = await Teacher.findOne({
    where: {
      id: id,
    },
  });
  return teacher;
};
const getTeacherWithCoursesById = async (id) => {
  const teacher = await Teacher.findOne({
    where: {
      id: id,
    },
    include: {
      model: Course,
      as: "courses", // use the alias name "courses"
      through: {
        model: TeacherCourse,
        attributes: [],
      },
      attributes: ["id", "name"], // add additional course attributes as needed
    },
  });
  return teacher;
};
const updateTeacher = async (id, body) => {
  const teacher = await Teacher.update(
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
  return teacher;
};

const deleteTeacher = async (teacher) => {
  const deletedTeacher = await teacher.destroy();

  return deletedTeacher;
};

module.exports = {
  getAllTeachers,
  createTeacher,
  getTeacherById,
  getTeacherWithCoursesById,
  updateTeacher,
  deleteTeacher,
};
