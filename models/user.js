const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const passportLocalMongoose = require('passport-local-mongoose');

const user = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


user.plugin(passportLocalMongoose);

module.exports = user;
