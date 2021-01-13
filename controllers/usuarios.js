const { response } = require('express');
const {Usuario} = require('../database/config');

const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuario.findAll({
        order : [
            ['online', 'ASC'],
        ],
    })
    /*
    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)
    */
    
    res.json({
        ok: true,
        usuarios,
    })
}



module.exports = {
    getUsuarios
}