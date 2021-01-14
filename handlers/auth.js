const { response } = require('express');
const bcrypt = require('bcryptjs');
const {User} = require('../database/db');
const { createJWT } = require('../middlewares/jwt');


const createUser = async (req, res = response ) => {

    const { email, password } = req.body;
    console.log(email)
    try {
        //check if email exists
        const u = await User.findOne({
            where: {
                email: email
            },
        })

        console.log(u)
        if(u) {
            return res.status(400).json({
                ok: false,
                msg: 'email ya existe'
            });
        }

        //console.log(u)

        const user = new User( req.body );
        
        // hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save(req.body);

        const token = await createJWT( user.uid);

        res.json({
            ok: true,
            user: user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'cannot create user' 
        });
    }
}

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const u = await User.findOne({
            where: {
                email: email
            },
        });

        if ( !u ) {
            return res.status(404).json({
                ok: false,
                msg: 'email not found'
            });
        }

        // compare password
        const validPassword = bcrypt.compareSync( password, u.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            });
        }

        const token = await createJWT( u.uid );
        
        res.json({
            ok: true,
            user: u,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error no login'
        })
    }

}


const renewToken = async( req, res = response) => {

    const uid = req.uid;

    // create jwt
    const token = await createJWT( uid );

    const user = await User.findOne( {
        where: {
            uid: uid
        },
    } );

    res.json({
        ok: true,
        user,
        token
    });

}


module.exports = {
    createUser,
    login,
    renewToken
}
