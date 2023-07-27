const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors } = require('../../middlewares/errorsValidator');

const { authPost, googleSignIn } = require('../../controllers/authController');

const router = Router();

router.post('/login', [
    check('mail', 'El correo es obligatorio y debe ser un correo válido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateErrors
], authPost);

router.post('/googleSignIn', [
    check('id_token', 'Google ID token requerido').notEmpty(),
    validateErrors
], googleSignIn);

module.exports = router;