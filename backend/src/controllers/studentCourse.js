const {
  studentCourseModule,
  courseModule,
  studentModule,
} = require("../modules");

// Create a student course record
const postStudentCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await studentModule.getStudentById(studentId);
    const course = await courseModule.getCourseById(courseId);
    if (!student) throw new Error("Student not found");
    if (!course) throw new Error("Course not found");
    const studentCourse = await studentCourseModule.createStudentCourse(
      studentId,
      courseId
    );

    return res.status(201).json(studentCourse);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

// Get all student course records
const getStudentCourses = async (req, res) => {
  try {
    const studentCourses = await studentCourseModule.getAllStudentCourses();

    return res.json(studentCourses);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};
const getStudentCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const studentCourse = await studentCourseModule.getStudentCourseById(id);
    if (!studentCourse) {
      throw new Error("Student course not found");
    }
    return res.json(studentCourse);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};
// Update a student course record by id
const updateStudentCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, courseId } = req.body;

    const studentCourse = await studentCourseModule.getStudentCourseById(id);

    if (!studentCourse) {
      return res.status(404).send("Student-Course not found");
    }
    if (studentId) {
      const student = await studentModule.getStudentById(studentId);
      if (!student) {
        return res.status(404).send("Student not found");
      }
    }
    if (courseId) {
      const course = courseId && (await courseModule.getCourseById(courseId));
      if (!course) {
        return res.status(404).send("Course not found");
      }
    }
    await studentCourseModule.updateStudentCourse(
      studentCourse,
      studentId,
      courseId
    );
    return res.json(studentCourse);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

// Delete a student course record by id
const deleteStudentCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const studentCourse = await studentCourseModule.getStudentCourseById(id);

    if (!studentCourse) {
      return res.status(404).send("Student course not found");
    }
    await studentCourseModule.deleteStudentCourse(studentCourse);
    return res.send("Student course deleted successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

module.exports = {
  postStudentCourse,
  getStudentCourses,
  getStudentCourseById,
  updateStudentCourse,
  deleteStudentCourse,
};
