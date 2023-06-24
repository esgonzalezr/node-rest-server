const Role = require('../models/roleModel');
const User = require('../models/userModel');

const isRoleValid = async (rolReq = '') => {
    const roleExists = await Role.findOne({ rol: rolReq });
    if (!roleExists) {
        throw new Error(`El rol ${rolReq} no es un rol válido.`);
    }
}

const mailExists = async (mail = '') => {
    //Verificar si el correo existe
    const mailFound = await User.findOne({ mail: mail });
    if (mailFound) {
        throw new Error(`El mail ${mail} ya se encuentra registrado.`);
    }
}



module.exports = {
    isRoleValid,
    mailExists
}