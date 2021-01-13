const { response } = require('express');
const bcrypt = require('bcryptjs');

const {Usuario} = require('../database/config');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');


const crearUsuario = async (req, res = response ) => {

    const { email, password } = req.body;
    console.log(email)
    try {
        //check if email exists
        const u = await Usuario.findOne({
            where: {
                email: email
            },
        })

        console.log(u)
        if(u) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya existe'
            });
        }

        //console.log(u)

        const usuario = new Usuario( req.body );
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //await usuario.save();
        await usuario.save(req.body);

        // Generar mi JWT
        const token = await generarJWT( usuario.uid);

        res.json({
            ok: true,
            usuario: usuario,
            token
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        //const usuarioDB = await Usuario.findOne({ email });
        const u = await Usuario.findOne({
            where: {
                email: email
            },
        });

        if ( !u ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, u.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generarJWT( u.uid );
        
        res.json({
            ok: true,
            usuario: u,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const renewToken = async( req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT( uid );

    // Obtener el usuario por el UID, Usuario.findById... 
    const usuario = await Usuario.findOne( {
        where: {
            uid: uid
        },
    } );

    res.json({
        ok: true,
        usuario,
        token
    });

}


module.exports = {
    crearUsuario,
    login,
    renewToken
}
