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
    check('name', 'The username can not be empty').notEmpty(),
    check('mail', 'The email must have a valid format').isEmail().custom(mail => mailExists(mail)),
    check('password', 'The password must have at least 6 characters length').notEmpty().isLength({ min: 6 }),
    check('rol').custom(rol => isRoleValid(rol)),
    validateErrors
], createUser);

//TODO: Implementar validación custom que valide que al menos un campo está presente
router.put('/:id', [
    check('id', 'The given id is not valid').isMongoId(),
    check('id', `There is no users with the given id`).custom(id => userExists(id)),
    check('rol').optional().custom(rol => isRoleValid(rol)),
    validateErrors
], updateUser);

router.delete('/:id', [
    check('id', 'The given id is not valid').isMongoId(),
    check('id').custom(id => userExists(id)),
    validateErrors
], deleteUser);

module.exports = router;