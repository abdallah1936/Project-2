module.exports = {
  development: {
    database: "project_two_auth",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {},
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
};
