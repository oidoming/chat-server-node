const {Usuario, Mensaje} = require('../database/config');

const usuarioConectado = async ( uid = 0 ) => {
    await Usuario.update({
        online: true,
        where: {
            uid: uid
        }
    })
    
    const usuario  = await Usuario.findOne({
        where: {
            uid: uid
        },
    });
    /*
    usuario.online = true;
    await usuario.save();
    */
    return usuario;
}

const usuarioDesconectado = async ( uid = '' ) => {
    const usuario  = await Usuario.findOne({
        where: {
            uid: uid
        },
    });
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async( payload ) => {

    /*
        payload: {
            de: '',
            para: '',
            texto: ''
        }
    */

    try {
        const mensaje = new Mensaje( payload );
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}



module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}


