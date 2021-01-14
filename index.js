const express = require('express');
const path = require('path');
require('./database/db').sequelize; //db 


const app = express();
app.use( express.json() ); // body parser

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

app.use( '/api/login', require('./routes/auth') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/messages', require('./routes/messages') );

const port = 3000

server.listen( port, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Server running on port', port );

});


