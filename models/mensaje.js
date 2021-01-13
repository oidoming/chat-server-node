module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mensajes', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        de: {
            type: DataTypes.INTEGER, references: {
                model: 'users',
                key: 'uid'
            }
        },
        para: {
            type: DataTypes.INTEGER, references: {
                model: 'users',
                key: 'uid'
            }
        },
        mensaje: DataTypes.STRING,
    }, {timestamps: false});
}
