const jwt = require('jsonwebtoken');

const generateToken = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETAPIKEY, {
            expiresIn: "12h"
        }, (err, token) => {

            if (err) {
                //console.log(err);
                reject("No se pudo generar el token");
                console.log("Error generando token: ", err.message);
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generateToken
}