const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    mail: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
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

//Sobreescritura del método toJSON: Este método se encarga de imprimir el objeto en formato JSON. 
//Lo sobreescribimos para modificar los datos que devuelve (evitar que regrese el password en el response)
//Nota: se debe sobreescribir con una función normal (function()) para que el this.toObjet() sea reconocido.
userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', userSchema);

