//const mongoose = require('mongoose');
const {Sequelize, DataTypes} = require('sequelize')
const UsuarioModel = require('../models/usuario')
const MensajeModel = require('../models/mensaje')

const user = 'postgres'
const host = 'localhost'
const database = 'postgres'
const password = 'granDgti991'
const port = '5432'

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false,
    query: {raw: true}
});

try {
    sequelize.authenticate();
    console.log('DB Online');
} catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos - Hable con el admin');
}

const Usuario = UsuarioModel(sequelize, DataTypes);
const Mensaje = MensajeModel(sequelize, DataTypes);
/*
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
});
*/
//Mensaje.sync({ force: true });
//console.log("The table for the User model was just (re)created!");

//Mensaje.sync({ force: true });
//console.log("The table for the Mensaje model was just (re)created!");

/*
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}*/

/*
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}
*/
module.exports = {
    Usuario,
    Mensaje,
    sequelize
}
