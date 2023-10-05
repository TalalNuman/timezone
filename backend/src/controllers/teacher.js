const { teacherCourseModule } = require("../modules");
const teacherModule = require("../modules/teacher");

const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherModule.createTeacher(req.body);
    if (req.body?.courses) {
      for (let i = 0; i < req.body.courses.length; i++) {
        await teacherCourseModule.createTeacherCourse(
          teacher.id,
          req.body.courses[i]
        );
      }
    }

    return res.status(200).send(teacher);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await teacherModule.getAllTeachers();
    return res.status(200).send(teachers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherModule.getTeacherById(req.params.id);
    if (!teacher) return res.status(204).send("Teacher not found");
    const teacherWithCourses = await teacherModule.getTeacherWithCoursesById(
      req.params.id
    );
    return res.status(200).send(teacherWithCourses);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateTeacher = async (req, res) => {
  console.log(req.body, "BODY");
  try {
    const teacher = await teacherModule.getTeacherById(req.params.id);
    if (!teacher) return res.status(204).send("Teacher not found");

    const updatedTeacher = await teacherModule.updateTeacher(
      req.params.id,
      req.body
    );
    // Delete all association from teacher_course and create new ones
    if (req.body?.courses) {
      await teacherCourseModule.deleteTeacherCourseByTeacherId(req.params.id);
      for (let i = 0; i < req.body.courses.length; i++) {
        await teacherCourseModule.createTeacherCourse(
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

const deleteTeacher = async (req, res) => {
  try {
    const teacher = await teacherModule.getTeacherById(req.params.id);
    if (!teacher) return res.status(204).send("Teacher not found");

    await teacherModule.deleteTeacher(teacher);
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
