const { response } = require("express");

const isAdmin = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: "Se está intentando validar el rol sin haber verificado el token"
        });
    }

    if (!req.user.rol) {
        return res.status(401).json({
            msg: "El usuario no tiene rol asignado"
        });
    }

    if (req.user.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: "Permisos insuficientes, acceso denegado"
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        
        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: "Permisos insuficientes - hasRole"
            });
        }
        next();
    }
}


module.exports = {
    isAdmin,
    hasRole
}