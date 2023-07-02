// In src/v1/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { isRoleValid, mailExists, userExists } = require('../../helpers/dbCustomValidations');
const { validateErrors, validateJWT, isAdmin, hasRole } = require('../../middlewares');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../../controllers/userController');

router.get('/', [
    validateJWT,
    //isAdmin,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    validateErrors
], getAllUsers);

router.post('/', [
    check('name', 'El usuario es obligatorio').notEmpty(),
    check('mail', 'El correo debe ser un correo válido').isEmail().custom(mail => mailExists(mail)),
    check('password', 'El password debe contener al menos 6 caracteres').notEmpty().isLength({ min: 6 }),
    check('rol').custom(rol => isRoleValid(rol)),
    validateErrors
], createUser);

//TODO: Implementar validación custom que valide que al menos un campo está presente
router.put('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id', `No existe ningún usuario con el id.`).custom(id => userExists(id)),
    check('rol').optional().custom(rol => isRoleValid(rol)),
    validateErrors
], updateUser);

router.delete('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(id => userExists(id)),
    validateErrors
], deleteUser);

module.exports = router;