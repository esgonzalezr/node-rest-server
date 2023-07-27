const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'El tipo de producto es obligatorio']
    },
    description: String,
    cost: {
        type: Number,
        required: [true, 'El valor del costo del producto es obligatorio']
    },
    salePrice: {
        type: Number,
        required: [true, 'El precio de venta del producto es obligatorio']
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    lastUpdate: Date

});

productSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();

    // Se puede hacer con la notación de puntos, pero así agrega el uid al final del objeto. Ejemplo: user.uid = _id
    const uid = _id;
    return { uid, ...product };
}

module.exports = model('Product', productSchema);


