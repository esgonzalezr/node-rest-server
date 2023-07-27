const { request, response } = require("express");
const Product = require('../models/productModel');

const getAllProducts = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;
    const queryCondition = { status: true };

    const [count, products] = await Promise.all([
        Product.count(queryCondition),
        Product.find(queryCondition)
            .limit(limit)
            .skip(offset)
    ]);

    res.status(200).json({
        count,
        products
    });
};

const createProduct = async (req = request, res = response) => {

    const date = new Date();

    // const dateOptions = { timeZone: process.env.TIMEZONE_FORMAT };
    // const currentDate = date.toLocaleString(process.env.LANG_FORMAT, dateOptions);

    const { name, type, description, cost, salePrice } = req.body;

    console.log("Headers", params);
    const product = new Product({ name, type, description, cost, salePrice, createdAt: date, lastUpdate: date });

    await product.save();

    res.status(200).json({
        product: product,
    });
};

const updateProduct = async (req = request, res = response) => {

};

const deleteProduct = async (req = request, res = response) => {

};


module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}