const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const saltRounds = 10;

const userGet = (req, res = response) => {

    //De esta forma se capturan los parámetros de segmento
    //El nombre del param, debe ser el mismo del definido en la ruta del endpoint
    const id = req.params.id; //Este objeto puede desestructurarse { id } = req.params
    const { nombre, apellido } = req.query;

    res.json({
        msg: 'get Api - from Controller',
        id,
        nombre,
        apellido
    });
}

const userPost = async (req, res = response) => {

    const { name, password, mail, rol } = req.body; //Acá se captura solo los datos necesarios del request
    const usuario = new User({ name, password, mail, rol }); //Se instancia el modelo sólo con los datos requeridos.

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(saltRounds);
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar usuario en db
    await usuario.save();

    //Se genera el response
    res.json({
        msg: 'post Api - from Controller',
        usuario
    });
}

const userPut = (req, res = response) => {
    res.json({
        msg: 'put Api - from Controller'
    });
}
const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - from Controller'
    });
}
const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api - from Controller'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}