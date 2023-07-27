const validateErrors = require('./errorsValidator');
const validateJWT = require('./validate-jwt');
const validateRoles = require('./validateRole');

module.exports = {
    ...validateErrors,
    ...validateJWT,
    ...validateRoles
}