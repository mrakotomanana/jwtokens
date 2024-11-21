module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define('user', {
        idLogin: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER, allowNull: false },
        email: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        username: { type: Sequelize.STRING, notEmpty: true },
    }, {
        tableName: 'users'
    });
    return User;
}