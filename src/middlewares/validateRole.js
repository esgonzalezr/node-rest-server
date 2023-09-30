const { response } = require("express");

const isAdmin = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            //msg: "Se está intentando validar el rol sin haber verificado el token"
            msg: "The role cannot be verified without a token validation first"
        });
    }

    if (!req.user.rol) {
        return res.status(401).json({
            msg: "The user doesn't have a role"
        });
    }

    if (req.user.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: "Insufficient permissions, access denied"
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                //msg: "Permisos insuficientes - hasRole"
                msg: "Insufficient permissions, access denied"
            });
        }
        next();
    }
}


module.exports = {
    isAdmin,
    hasRole
}