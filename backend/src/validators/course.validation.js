const Joi = require("joi");

const getCourse = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    field: Joi.string().required(["Science", "History", "Arts"]),
    lab: Joi.boolean().required(),
    credit_hours: Joi.number().integer().min(1).required(),
  }),
};

const updateCourse = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    field: Joi.string().required(["Science", "History", "Arts"]),
    lab: Joi.boolean().required(),
    credits_hours: Joi.number().integer().min(1).required(),
  }),
};
const deleteCourse = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
module.exports = {
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};
