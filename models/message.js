module.exports = (sequelize, DataTypes) => {
    return sequelize.define('messages', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        from: {
            type: DataTypes.INTEGER, references: {
                model: 'users',
                key: 'uid'
            }
        },
        to: {
            type: DataTypes.INTEGER, references: {
                model: 'users',
                key: 'uid'
            }
        },
        message: DataTypes.STRING,
    }, {timestamps: false});
}
