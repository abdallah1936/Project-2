const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
  );
  
  module.exports = sequelize;
  {
    "development": {
      "database": "project_two_auth",
      "host": "127.0.0.1",
      "dialect":"postgres"
    },
    "production": {
      "use_env_variable": "DATABASE_URL"
    }
  }