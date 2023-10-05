const { Student, Course, StudentCourse, sequelize } = require("../models");

const createStudent = async (body) => {
  const student = await Student.create(body);
  return student;
};
const getAllStudents = async () => {
  const students = await Student.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(DISTINCT course_id) FROM StudentCourses WHERE student_id = Students.id)`
          ),
          "course_count",
        ],
      ],
    },
    include: [{ model: Course, as: "courses", attributes: [] }],
  });

  return students;
};
const getStudentById = async (id) => {
  const student = await Student.findOne({
    where: {
      id: id,
    },
    include: {
      model: Course,
      as: "courses", // use the alias name "courses"
      through: {
        model: StudentCourse,
        attributes: [],
      },
      attributes: ["id", "name"], // add additional course attributes as needed
    },
  });
  return student;
};
const updateStudent = async (id, body) => {
  const student = await Student.update(
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
  return student;
};

const deleteStudent = async (student) => {
  await student.destroy();

  return "deleted";
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
