const { Op } = require("sequelize");
const {Message} = require('../database/db');

const getMessages = async(req, res) => {

    const thisId = req.uid;
    const otherId = req.params.from;

    const messages = await Message.findAll({
        where: {
            [Op.or]: [
                {from: thisId, to: otherId},
                {from: otherId, to: thisId}
            ]
        },
        order: [
            ['id', 'DESC']
        ],
        raw: true
    });

    res.json({
        ok: true,
        messages: messages
    })

}



module.exports = {
    getMessages
}