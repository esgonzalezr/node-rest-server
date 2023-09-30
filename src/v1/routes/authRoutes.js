const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors } = require('../../middlewares/errorsValidator');

const { authPost, googleSignIn } = require('../../controllers/authController');

const router = Router();

router.post('/login', [
    check('mail', 'The email can not be empty and must be valid').isEmail(),
    check('password', 'The password can not be empty').notEmpty(),
    validateErrors
], authPost);

router.post('/googleSignIn', [
    check('id_token', 'The google token id is required').notEmpty(),
    validateErrors
], googleSignIn);

module.exports = router;