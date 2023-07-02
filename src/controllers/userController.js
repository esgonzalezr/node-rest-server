const { request, response } = require("express");
const bcrypt = require('bcrypt');

const User = require('../models/userModel.js');

const saltRounds = 10;

const getAllUsers = async (req = request, res = response) => {

    const { limit = 5, offset = 0 } = req.query; //De esta forma se capturan los parámetros del query en la url (?limit=2&offset=5)
    const queryCondition = { status: true }; //Esta condición se hace para traer solo usuarios activos y se pasa como parámetro del find y del count

    // De esta manera se ejecutan las dos consultas de forma asíncrona y se capturan en la variable totalRows y users (de acuerdo a la posición de los parámetros)
    // mediante la desestructuración del arreglo que retorna el Promise.all()
    // Consideraciones: Si una promesa falla, todas las demás del Promise.all() no se resolverán.
    const [count, users] = await Promise.all([
        User.count(queryCondition),
        User.find(queryCondition)
            .limit(limit)
            .skip(offset)
    ]);

    res.status(200).json({
        count,
        users
    });
}

const createUser = async (req = request, res = response) => {

    const { name, password, mail, rol } = req.body; //Acá se captura solo los datos necesarios del request
    const user = new User({ name, password, mail, rol }); //Se instancia el modelo sólo con los datos requeridos.

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(password, salt);

    //Guardar user en db
    await user.save();

    //Se genera el response
    res.json({
        user
    });
}

const updateUser = async (req = request, res = response) => {
    const { id } = req.params; // Se obtiene el parámetro de la url
    const { _id, googleLogged, password, mail, ...user } = req.body; // Se obtienen los datos del body del request 

    console.log("Usuario que se actualizará", user);
    const usuario = await User.findByIdAndUpdate(id, user); //Actualizar el documento

    res.json({
        id,
        usuario
    });
}

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    const loggedUser = req.user;

    //Eliminación física de la colección
    //const user = await User.findByIdAndDelete(id);

    //Eliminación lógica (sólo se inactiva el documento)
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        user,
        loggedUser
    });
}


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}