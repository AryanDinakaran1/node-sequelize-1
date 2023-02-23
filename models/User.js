module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User',{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    })
    return User;
}