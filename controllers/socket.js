const {Usuario, Mensaje} = require('../database/config');

const usuarioConectado = async ( uid = 0 ) => {
 //  try {
    const [numberOfAffectedRows, affectedRows] = await Usuario.update({ 
        online: true
      }, {
        where: {uid: uid},
        returning: true, // needed for affectedRows to be populated
        plain: true, // makes sure that the returned instances are just plain objects
        query: {raw: true}
      });

    return affectedRows['dataValues'];
   //} catch (error) {
    //   console.log(error)
  // }
}

const usuarioDesconectado = async ( uid = 0 ) => {
   // try {
        const [numberOfAffectedRows, affectedRows] = await Usuario.update({ 
            online: false
          }, {
            where: {uid: uid},
            returning: true, // needed for affectedRows to be populated
            plain: true, // makes sure that the returned instances are just plain objects
            query: {raw: true}
        });

        return affectedRows['dataValues'];
 //  } catch (error) {
  //     console.log(error)
  // }

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
        await mensaje.save(payload);

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


