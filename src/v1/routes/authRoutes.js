const { Router } = require('express');
const { check } = require('express-validator');
const { authPost } = require('../../controllers/authController');
const { validateErrors } = require('../../middlewares/errorsValidator');

const router = Router();

router.post('/login', [
    check('mail', 'El correo es obligatorio y debe ser un correo válido').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateErrors
], authPost);

module.exports = router;