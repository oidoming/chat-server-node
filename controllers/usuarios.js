const { response } = require('express');
const {Usuario} = require('../database/config');

const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuario.findAll({
        order : [
            ['online', 'DESC']
        ],
    })
    
    res.json({
        ok: true,
        usuarios,
    })
}



module.exports = {
    getUsuarios
}