const { response } = require("express");
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { generateToken } = require("../helpers/generate-jwt");

const authPost = async (req, res = response) => {

    const { mail, password } = req.body;

    try {
        //Validar si el correo existe
        const usuario = await User.findOne({ mail: mail });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario o contraseña inválidos - correo no existe (borrar tip)"
            });
        }

        //Validar que sea un usuario activo
        if (usuario.status === false) {
            return res.status(400).json({
                msg: "Usuario o contraseña inválidos - usuario inactivo (borrar tip)"
            });
        }

        //Validar el password
        const passwordIsValid = bcrypt.compareSync(password, usuario.password);
        if (!passwordIsValid) {
            return res.status(400).json({
                msg: "Usuario o contraseña inválidos - clave incorrecta (borrar tip)"
            });
        }
        
        //Generar token
        const token = await generateToken(usuario.id);

        //Generar response
        res.json({
            token,
            usuario
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error del sistema, hable con el administrador"
        });
    }
}

module.exports = {
    authPost
}