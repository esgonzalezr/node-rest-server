const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors, validateJWT } = require('../../middlewares');
const { notExistsCategoryById } = require('../../helpers/dbCustomValidations');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../../controllers/categoryController');

const router = Router();

router.get('/', [], getAllCategories);

router.get('/:id', [
    check('id', 'The given id is not valid').isMongoId(),
    check('id').custom(id => notExistsCategoryById(id)),
    validateErrors
], getCategoryById);

router.post('/', [
    validateJWT,
    check('name', 'The category name can not be null').notEmpty(),
    validateErrors
], createCategory);

router.put('/:id', [
    validateJWT,
    check('id', `The given category id is not valid`).isMongoId(),
    check('id').custom(id => notExistsCategoryById(id)),
    validateErrors
], updateCategory);

router.delete('/:id', [
    validateJWT,
    check('id', `The given category id is not valid`).isMongoId(),
    check('id').custom(id => notExistsCategoryById(id)),
    validateErrors
], deleteCategory);

module.exports = router;