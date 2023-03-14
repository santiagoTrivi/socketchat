const { request, response } = require("express");







const checkFile =(req = request, res = response , next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.arch) {
        return res.status(400).json({message: 'No files were uploaded. no arch in the request'});
    }

    next();

};

module.exports = {
    checkFile
};