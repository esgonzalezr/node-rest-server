validateErrors = require('./errorsValidator');
validateJWT = require('./validate-jwt');
validateRoles = require('./validateRole');

module.exports = {
    ...validateErrors,
    ...validateJWT,
    ...validateRoles
}