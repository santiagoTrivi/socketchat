
const { checkCategory } = require('./check-category');
const {fieldCheck, rolValid, emailvalid } = require('./check-fields');
const { validationjwt } = require('./validationjwt');
const { validationRolJwt } = require('./validationRolJwt');
const { validationSellerRolKwt } = require('./validationSellerRolKwt');
const { checkFile } = require('./check-file');


module.exports = {
    fieldCheck,
    rolValid,
    emailvalid,
    validationjwt,
    checkCategory,
    validationRolJwt,
    validationSellerRolKwt,
    checkFile    
    
};