const { io } = require('../index');
const { socketValidateJWT } = require('../middlewares/jwt');
const { setConnectedUser, setDisconnectedUser, saveMessage } = require('../handlers/socket');


io.on('connection', (client) =>  {
    const [ valid, uid ] = socketValidateJWT( client.handshake.headers['x-token'] )

    if ( !valid ) { return client.disconnect(); } //validate auth
    
    setConnectedUser( uid );

    // join socket server
    client.join( uid );

    client.on('private-message', async( payload ) => {
        await saveMessage( payload );
        io.to( payload.to ).emit('private-message', payload );
    })  

    client.on('disconnect', () => {
        setDisconnectedUser(uid);
    });

});
