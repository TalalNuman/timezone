const studentModule = require("../modules/student");
const studentCourseModule = require("../modules/studentCourse");

const createStudent = async (req, res) => {
  try {
    console.log(req.body, "BODY");
    const student = await studentModule.createStudent(req.body);
    for (let i = 0; i < req.body.courses.length; i++) {
      await studentCourseModule.createStudentCourse(
        student.id,
        req.body.courses[i]
      );
    }
    return res.status(200).send(student);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await studentModule.getAllStudents();
    return res.status(200).send(students);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getStudentById = async (req, res) => {
  try {
    const student = await studentModule.getStudentById(req.params.id);
    if (!student) return res.status(204).send("Student not found");
    return res.status(200).send(student);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentModule.getStudentById(req.params.id);
    if (!student) return res.status(204).send("Student not found");
    console.log(req.body, "BODY");
    const updatedStudent = await studentModule.updateStudent(
      req.params.id,
      req.body
    );
    // Delete all association from student_course and create new ones
    if (req.body?.courses) {
      await studentCourseModule.deleteStudentCourseByStudentId(req.params.id);
      for (let i = 0; i < req.body.courses.length; i++) {
        await studentCourseModule.createStudentCourse(
          req.params.id,
          req.body.courses[i]
        );
      }
    }
    return res.status(200).send({ message: "Updated" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    console.log(req.params.id, "ID");
    const student = await studentModule.getStudentById(req.params.id);
    if (!student) return res.status(204).send("Student not found");

    await studentModule.deleteStudent(student);
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
