const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The product name cannot be empty'],
        unique: true
    },
    description: String,
    price: {
        type: Number,
        required: [true, 'The cost of the product cannot be empty and must be a numeric value']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

productSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();

    // Se puede hacer con la notación de puntos, pero así agrega el uid al final del objeto. Ejemplo: user.uid = _id
    const uid = _id;
    return { uid, ...product };
}

module.exports = model('Product', productSchema);


