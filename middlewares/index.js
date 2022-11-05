const  validateFields  = require("./validate-fields");
const  validateJWT  = require("./validate-jwt");

validateFields

module.exports = {
    ...validateFields,
    ...validateJWT
}