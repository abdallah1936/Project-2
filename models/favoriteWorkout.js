module.exports = (sequelize, DataTypes) => {
  const FavoriteWorkout = sequelize.define("FavoriteWorkout", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Workouts',
        key: 'id'
      }
    }
  });

  FavoriteWorkout.associate = (models) => {
    FavoriteWorkout.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    FavoriteWorkout.belongsTo(models.Workout, {
      foreignKey: 'workoutId',
      as: 'workout'
    });
  };

  return FavoriteWorkout;
};
