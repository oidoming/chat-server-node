const { response } = require('express');
const {User} = require('../database/db');

const getUsers = async ( req, res = response ) => {
    const users = await User.findAll({
        order : [
            ['online', 'DESC']
        ],
    })
    
    res.json({
        ok: true,
        users,
    })
}



module.exports = {
    getUsers
}