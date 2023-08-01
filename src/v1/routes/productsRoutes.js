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
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(id => notExistsProductById(id)),
    validateErrors
], getProductById);

router.post('/', [
    validateJWT,
    check('name', 'El nombre del producto es obligatorio').notEmpty(),
    check('name').custom(name => productExists(name)),
    check('description', 'La descripción del producto es obligatoria').notEmpty(),
    check('price', 'El precio debe ser un valor numérico').optional().isNumeric(),
    check('category', 'La categoría es obligatoria').notEmpty(),
    check('category', 'El id de la categoría no es un id válido').isMongoId(),
    check('category').custom(cat => notExistsCategoryById(cat)),
    check('available', 'La disponibilidad debe ser true o false').optional().isBoolean(),
    validateErrors
], createProduct);

router.put('/:id', [], updateProduct);

router.delete('/:id', [
    validateJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(id => notExistsProductById(id)),
    validateErrors
], deleteProduct);


module.exports = router;