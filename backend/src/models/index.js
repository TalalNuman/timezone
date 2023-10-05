const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require("./student")(sequelize, Sequelize.DataTypes);
db.Course = require("./course")(sequelize, Sequelize.DataTypes);
db.StudentCourse = require("./studentCourse")(sequelize, Sequelize.DataTypes);
db.Teacher = require("./teacher")(sequelize, Sequelize.DataTypes);
db.TeacherCourse = require("./teacherCourse")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
