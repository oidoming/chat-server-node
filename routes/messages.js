const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt');
const { getMessages } = require('../handlers/messages');
const router = Router();


router.get('/:from', validateJWT, getMessages );

module.exports = router;


