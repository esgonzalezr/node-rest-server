const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/userController');
const { validateErrors } = require('../middlewares/errors-validator');
const { isRoleValid, mailExists } = require('../helpers/db-custom-validators');


const router = Router();

router.get('/', userGet);

router.get('/:id', userGet);

//El check() valida el campo indicado y apila los errores en el validationResult de express-validator.
router.post('/', [
    check('name', 'El usuario es obligatorio').notEmpty(),
    check('mail', 'El correo debe ser un correo válido').isEmail().custom(mail => mailExists(mail)),
    check('password', 'El password debe contener al menos 6 caracteres').notEmpty().isLength({ min: 6 }),
    //check('rol','El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rol => isRoleValid(rol)),
    validateErrors
], userPost);

router.put('/', userPut);

router.patch('/', userPatch);

router.delete('/', userDelete);



module.exports = router;