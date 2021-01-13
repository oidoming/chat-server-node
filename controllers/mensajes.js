const { Op } = require("sequelize");
const {Mensaje} = require('../database/config');

const obtenerChat = async(req, res) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.findAll({
        where: {
            [Op.or]: [
                {de: miId, para: mensajesDe},
                {de: mensajesDe, para: miId}
            ]
        },
        order: [
            ['id', 'DESC']
        ],
        raw: true
    });

    res.json({
        ok: true,
        mensajes: last30
    })

}



module.exports = {
    obtenerChat
}