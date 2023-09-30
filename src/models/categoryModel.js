const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The category name cannot be empty']
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'The status cannot be empty']
    },
    user: {
        type: Schema.Types.ObjectId,    //De esta manera se indica que este campo es referencia a un ID de un modelo de mongo.
        ref: 'User',                    //De esta manera se indica cuál es Modelo al que hace referencia este campo. La referencia debe tener el nombre exacto del Modelo.
        required: [true, 'The user cannot be empty']
    }
});

categorySchema.methods.toJSON = function () {
    const { __v, _id, ...category } = this.toObject();

    // Se puede hacer con la notación de puntos, pero así agrega el uid al final del objeto. Ejemplo: user.uid = _id
    const uid = _id;
    return { uid, ...category };
}

module.exports = model('Category', categorySchema);