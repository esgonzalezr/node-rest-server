const { response } = require("express");
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { generateToken } = require("../helpers/generate-jwt");
const { googleTokenVerify } = require("../helpers/googleTokenVerify");

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
        res.status(200).json({
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


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, mail, img } = await googleTokenVerify(id_token);

        //Se busca el usuario en la bd por el correo
        let user = await User.findOne({ mail: mail });


        //Si el usuario no existe, se debe crear
        if (!user) {
            const userData = {
                name: name,
                mail: mail,
                password: 'SignedOnWithGoogle',
                img: img,
                googleLogged: true
            };

            console.log("estoy creandolo")
            user = new User(userData);
            await user.save();
        }

        //Si el usuario tiene estado false, es porque está desactivado en mi BD
        if (!user.status) {
            return res.status(401).json({
                msg: "Usuario deshabilitado. Hable con el administrador."
            });
        }

        //Generar token
        const token = await generateToken(user.id);
        console.error(user);

        //Retorna respuesta de usuario autenticado y el JWT token de mi backend
        res.status(200).json({
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Google token inválido"
        });
    }
}

module.exports = {
    authPost,
    googleSignIn
}