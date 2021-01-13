module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        uid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        online: {type: DataTypes.BOOLEAN, defaultValue: false},
    }, {timestamps: false});
}
