const { Role, User, Product, Category } = require('../models');

// *******************
// * User validations
// *******************
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

const userExists = async (id) => {
    //Verificar si el correo existe
    const userFound = await User.findById(id);
    if (!userFound) {
        throw new Error(`No existe ningún usuario con el id ${id}.`);
    }
}

// ***********************
// * Category validations
// ***********************
const notExistsCategoryById = async (id) => {
    const foundCategory = await Category.findById(id);
    if (!foundCategory) {
        throw new Error(`No existe ninguna categoría con el id ${id}`);
    }
}

// **********************
// * Product validations
// **********************
const productExists = async (name = '') => {
    const queryCondition = { name: name };
    const productFound = await Product.findOne(queryCondition);

    if (productFound) {
        throw new Error(`Ya existe un producto con el nombre ${name}.`);
    }
}


module.exports = {
    isRoleValid,
    mailExists,
    notExistsCategoryById,
    productExists,
    userExists,
}