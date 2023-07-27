const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const validateJWT = async (req = request, res = response, next) => {

    //capturar el header del token
    const token = req.header("auth-token");

    if (!token) {
        res.status(401).json({
            msg: "El token de autenticación es obligatorio"
        });
    }

    try {
        //console.log('Verify token:', jwt.verify(token, process.env.SECRETAPIKEY));
        const { uid } = jwt.verify(token, process.env.SECRETAPIKEY);
        const loggedUser = await User.findById(uid);

        //Se valida que el usuario del token exista en bd
        if (!loggedUser) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario inexistente en bd (borrar tip)'
            });
        }

        //Se valida que el usuario dueño del token esté activo
        if (!loggedUser.status) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario inactivo (borrar tip)'
            });
        }

        req.user = loggedUser;
        req.uid = uid;

        console.log('Usuario:', req.user);
        console.log('UID:', req.uid);
        
        next();
    } catch (err) {
        // err
        console.log("Error de autenticación: ", err.message);
        res.status(401).json({
            msg: `Error de autenticación - ${err.message}`
        });
    }
}

module.exports = {
    validateJWT
}