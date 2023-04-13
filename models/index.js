const User = require("./user");
const Workout = require("./workout");
const FavoriteWorkout = require("./favoriteWorkout");
const config = require("../config/config.json");
const env = process.env.NODE_ENV || "development";
const { database, username, password, host, dialect } = config[env];
const Sequelize = require("sequelize");


const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const models = {
  User: User.init(sequelize, Sequelize),
  Workout: Workout.init(sequelize, Sequelize),
  FavoriteWorkout: FavoriteWorkout.init(sequelize, Sequelize),
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
