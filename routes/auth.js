
/**
 * ?   RUTAS DE USUARIOS / Auth
 * !   host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/field-validates');
const { createUser, hola } = require('../controllers/auth');
const { valJWT } = require('../middlewares/validate-jwt');


const router = Router();

//  !Rutas

router.post('/new' , [
    check('user', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password es obligatorio').not().isEmpty(),
    validarCampos
],
    createUser
)

router.post('/login', [
    check('user', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
],
    EnterUser
)



router.get('/hola', [], hola)


module.exports = router;