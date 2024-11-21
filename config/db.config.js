module.exports = {
    hostname: "localhost",
    user: "root",
    password: "",
    database: "users",
    dialect: "mysql",
    port: 3307,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};