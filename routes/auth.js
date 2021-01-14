const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../handlers/auth');
const { checkReq } = require('../middlewares/checkreq');
const { validateJWT } = require('../middlewares/jwt');


const router = Router();

router.post('/new', [
    check('name','name require').not().isEmpty(),
    check('password','password require').not().isEmpty(),
    check('email','email require').isEmail(),
    checkReq
], createUser );

router.post('/', [
    check('password','password require').not().isEmpty(),
    check('email','email require').isEmail(),
], login );


router.get('/renew', validateJWT, renewToken );

module.exports = router;
