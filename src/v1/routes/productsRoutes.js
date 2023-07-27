const { Router } = require('express');
const { check } = require('express-validator');

const { validateErrors } = require('../../middlewares/errorsValidator');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../../controllers/productController');
const { productExists } = require('../../helpers/dbCustomValidations');

const router = Router();

router.get('/', [], getAllProducts);

router.post('/', [
    check('name', 'El nombre del producto es obligatorio').notEmpty(),
    check('name').custom(name => productExists(name)),
    validateErrors
], createProduct);
//name, type, description, cost, salePrice

router.put('/', [], updateProduct);

router.delete('/', [], deleteProduct);


module.exports = router;