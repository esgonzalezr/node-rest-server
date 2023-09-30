const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The username cannot be empty']
    },
    mail: {
        type: String,
        required: [true, 'The email cannot be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The passowrd cannot be empty']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    googleLogged: {
        type: Boolean,
        default: false
    }
});

//Sobreescritura del método toJSON para imprimir un objeto de tipo User
userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    const uid = _id;
    return { uid, ...user };

    // Se puede hacer con la notación de puntos, pero así agrega el uid al final del objeto. Ejemplo: user.uid = _id
    // user.uid = _id;
    // return user;
}

module.exports = model('User', userSchema);