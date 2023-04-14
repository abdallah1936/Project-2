const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.js")[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Workout = require("./workout")(sequelize, Sequelize.DataTypes);
const FavoriteWorkout = require("./favoriteWorkout")(sequelize, Sequelize.DataTypes);

const models = {
  User,
  Workout,
  FavoriteWorkout
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
  Sequelize,
};

module.exports = db;