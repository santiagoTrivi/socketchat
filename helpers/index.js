const {generatorjwt, checkJwtFrontend} = require('./generator-jwt');
const {verify} = require('./googleVerify');
const {uploadFiles} = require('./upload-files');
const {allowedCollections} = require('./check-collection');


module.exports = {
    generatorjwt,
    verify,
    uploadFiles,
    allowedCollections,
    checkJwtFrontend
};