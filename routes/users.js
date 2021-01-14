const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt');
const { getUsers } = require('../handlers/users');
const router = Router();


router.get('/', validateJWT, getUsers );

module.exports = router;
