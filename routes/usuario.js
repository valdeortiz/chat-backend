// path: api/usuario

const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuarios } = require('../controllers/usuario');

const validarJWT = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT,  getUsuarios);

module.exports = router;