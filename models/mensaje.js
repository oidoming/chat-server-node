//const { Schema, model } = require('mongoose');

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


/*
const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
})*/



//module.exports = model('Mensaje', MensajeSchema );