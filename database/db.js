const {Sequelize, DataTypes} = require('sequelize')
const UserModel = require('../models/user')
const MessageModel = require('../models/message')

const userdb = 'chatadmin'
const host = 'localhost'
const database = 'chat'
const password = 'pass123'
const port = '5432'

const sequelize = new Sequelize(database, userdb, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false,
    query: {raw: true}
});

try {
    sequelize.authenticate();
    console.log('db online');
} catch (error) {
    console.log(error);
    throw new Error('cannot connect to db');
}

const User = UserModel(sequelize, DataTypes);
const Message = MessageModel(sequelize, DataTypes);
/*
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
});
*/
//User.sync({ force: true });
//console.log("The table for the User model was just (re)created!");

//Message.sync({ force: true });
//console.log("The table for the Message model was just (re)created!");

module.exports = {
    User,
    Message,
    sequelize
}
