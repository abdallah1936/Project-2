module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define("Workout", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Workout.associate = (models) => {
    Workout.hasMany(models.FavoriteWorkout, {
      foreignKey: 'workoutId',
      as: 'favorites'
    });
  };

  return Workout;
};