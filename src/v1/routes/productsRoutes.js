const { Router } = require('express');
const { check } = require('express-validator');

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById } = require('../../controllers/productController');
const { productExists, notExistsCategoryById, notExistsProductById } = require('../../helpers/dbCustomValidations');
const { validateJWT, validateErrors } = require('../../middlewares');

const router = Router();

/*
    name, -> mandatory
    description, -> mandatory
    price,
    category (id), -> mandatory
    status
    available,
    user -> mandatory
 */

router.get('/', [], getAllProducts);

router.get('/:id', [
    check('id', 'The given id is not valid').isMongoId(),
    check('id').custom(id => notExistsProductById(id)),
    validateErrors
], getProductById);

router.post('/', [
    validateJWT,
    check('name', 'The product name can not be empty').notEmpty(),
    check('name').custom(name => productExists(name)),
    check('description', 'The product description can not be empty').notEmpty(),
    check('price', 'The price must be a numeric value').optional().isNumeric(),
    check('category', 'The category can not be empty').notEmpty(),
    check('category', 'The given category id is not valid').isMongoId(),
    check('category').custom(cat => notExistsCategoryById(cat)),
    check('available', `The availability must be 'true' or 'false'`).optional().isBoolean(),
    validateErrors
], createProduct);

router.put('/:id', [], updateProduct);

router.delete('/:id', [
    validateJWT,
    check('id', 'The given id is not valid').isMongoId(),
    check('id').custom(id => notExistsProductById(id)),
    validateErrors
], deleteProduct);


module.exports = router;