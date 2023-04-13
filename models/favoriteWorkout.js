const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FavoriteWorkout = sequelize.define('favoriteWorkout', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  workoutId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'workouts',
      key: 'id',
    },
  },
  workoutName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = FavoriteWorkout;
