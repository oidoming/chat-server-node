const jwt = require('jsonwebtoken');


const secretKey = 'secretToken777';

const createJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, secretKey, {
            expiresIn: '24h' 
        }, ( err, token ) => {

            if ( err ) {
                reject('cannot create jwt');

            } else {
                resolve( token );
            }

        })

    });


}

const validateJWT = ( req, res, next ) => {

    // Leer token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No token'
        });
    }

    try {

        const { uid } = jwt.verify( token, secretKey ); 
        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
}

const socketValidateJWT = ( token = '' ) => {

    try {

        const { uid } = jwt.verify( token, secretKey );
        return [ true, uid];

    } catch (error) {
        return [ false, null ];
    }

}


module.exports = {
    createJWT,
    validateJWT,
    socketValidateJWT
}