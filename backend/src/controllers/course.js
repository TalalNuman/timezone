const courseModule = require("../modules/course");

const createCourse = async (req, res) => {
  try {
    req.body.time = new Date();
    req.body.test_date = new Date();
    console.log(req.body, "BODY");
    const course = await courseModule.createCourse(req.body);
    return res.status(200).send(course);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await courseModule.getAllCourses();
    return res.status(200).send(courses);
  } catch (error) {
    return res.status(500).send(e.message);
  }
};
const getCourseById = async (req, res) => {
  try {
    const course = await courseModule.getCourseById(req.params.id);
    console.log(course.created_at.toLocaleString(), "COURSE");
    if (!course) return res.status(204).send("Course not found");
    const courseWithStudents = await courseModule.getCourseWithStudentsById(
      req.params.id
    );
    return res.status(200).send(courseWithStudents);
  } catch (error) {
    return res.status(500).send(e.message);
  }
};

const updateCourse = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const course = await courseModule.getCourseById(req.params.id);
    if (!course) return res.status(204).send("Course not found");

    const updatedCourse = await courseModule.updateCourse(
      req.params.id,
      req.body
    );
    return res.status(200).send({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).send(e.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await courseModule.getCourseById(req.params.id);
    if (!course) return res.status(204).send("Course not found");

    await courseModule.deleteCourse(req.params.id);
    return res.status(200).send({ message: "Course deleted" });
  } catch (error) {
    return res.status(500).send(e.message);
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
