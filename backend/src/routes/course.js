const express = require("express");
const router = express.Router();
const { courseController } = require("../controllers");
const validate = require("../middlewares/validate");
const { courseValidation } = require("../validators");

router.get("/", courseController.getCourses);
router.post(
  "/",
  validate(courseValidation.createCourse),
  courseController.createCourse
);

router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
