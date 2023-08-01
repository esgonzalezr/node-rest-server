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
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    res.status(200).json({
        count,
        products
    });
};

const getProductById = async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name');

        res.status(200).json({
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
}

const createProduct = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase();
    const description = req.body.description.toUpperCase();
    const user = req.user._id;
    const { price = 0, category, available = true } = req.body;

    const data = {
        name,
        description,
        price,
        category,
        available,
        user
    }

    try {

        const product = new Product(data);
        await product.save();

        res.status(200).json({
            product: data,
        });

    } catch (error) {

        console.log("Error creating a product:", error);
        res.status(500).json({
            msg: error
        });

    }

};

const updateProduct = async (req = request, res = response) => {
};

const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const user = req.user._id;

    const data = {
        status: false,
        user: user
    }

    try {

        const deletedProduct = await Product.findByIdAndUpdate(id, data, { returnOriginal: false })
            .populate('category', 'name')
            .populate('user', 'name');

        res.status(200).json({
            product: deletedProduct
        });
    } catch (error) {
        console.log("Error deleting a product:", error);
        res.status(500).json({
            msg: error
        });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}