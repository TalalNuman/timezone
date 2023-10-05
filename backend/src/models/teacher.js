module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teachers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Teacher.associate = (models) => {
    Teacher.belongsToMany(models.Course, {
      through: "TeacherCourses",
      as: "courses",
      foreignKey: "teacher_id",
      otherKey: "course_id",
    });
  };
  return Teacher;
};
