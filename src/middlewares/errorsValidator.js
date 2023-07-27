const { validationResult } = require('express-validator');

const validateErrors = (req, res, next) => {
    
    const errors = validationResult(req); //Se capturan los errores que se generaron en el check de la ruta (ver archivo de ruta user.js)
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next(); //Esta función invoca el callback (tercer argumento) e indica que pasaron las validaciones, por lo que se ejecutarán los siguientes middlewares en la ruta
}

module.exports = {
    validateErrors
}