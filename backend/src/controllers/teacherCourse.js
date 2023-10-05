const {
  teacherCourseModule,
  courseModule,
  teacherModule,
} = require("../modules");

// Create a teacher course record
const postTeacherCourse = async (req, res) => {
  try {
    const { teacherId, courseId } = req.body;
    console.log(teacherId, courseId);
    if (teacherId && courseId) {
      const teacher = await teacherModule.getTeacherById(teacherId);
      if (!teacher) throw new Error("Teacher not found");
      const course = await courseModule.getCourseById(courseId);
      if (!course) throw new Error("Course not found");
    }
    const teacherCourse = await teacherCourseModule.createTeacherCourse(
      teacherId,
      courseId
    );

    return res.status(201).json(teacherCourse);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

// Get all teacher course records
const getTeacherCourses = async (req, res) => {
  try {
    const teacherCourses = await teacherCourseModule.getAllTeacherCourses();

    return res.json(teacherCourses);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};
const getTeacherCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacherCourse = await teacherCourseModule.getTeacherCourseById(id);
    if (!teacherCourse) {
      throw new Error("Teacher course not found");
    }
    return res.json(teacherCourse);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};
// Update a teacher course record by id
const updateTeacherCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacherId, courseId } = req.body;

    const teacherCourse = await teacherCourseModule.getTeacherCourseById(id);

    if (!teacherCourse) {
      return res.status(404).send("Teacher-Course not found");
    }
    if (teacherId) {
      const teacher = await teacherModule.getTeacherById(teacherId);
      if (!teacher) {
        return res.status(404).send("Teacher not found");
      }
    }
    if (courseId) {
      const course = courseId && (await courseModule.getCourseById(courseId));
      if (!course) {
        return res.status(404).send("Course not found");
      }
    }
    await teacherCourseModule.updateTeacherCourse(
      teacherCourse,
      teacherId,
      courseId
    );
    return res.json(teacherCourse);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

// Delete a teacher course record by id
const deleteTeacherCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const teacherCourse = await teacherCourseModule.getTeacherCourseById(id);

    if (!teacherCourse) {
      return res.status(404).send("Teacher course not found");
    }
    await teacherCourseModule.deleteTeacherCourse(teacherCourse);
    return res.send("Teacher course deleted successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
};

module.exports = {
  postTeacherCourse,
  getTeacherCourses,
  getTeacherCourseById,
  updateTeacherCourse,
  deleteTeacherCourse,
};
