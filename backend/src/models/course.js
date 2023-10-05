module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Courses",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field: {
        type: DataTypes.ENUM("Science", "History", "Arts"),
        allowNull: false,
      },
      credit_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lab: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      test_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      courseId: "id",
    }
  );

  Course.associate = (models) => {
    Course.belongsToMany(models.Student, {
      through: "StudentCourses",
      as: "students",
      foreignKey: "course_id",
      otherKey: "student_id",
    });
    Course.belongsToMany(models.Teacher, {
      through: "TeacherCourses",
      as: "teachers",
      foreignKey: "course_id",
      otherKey: "teacher_id",
    });
  };

  return Course;
};
