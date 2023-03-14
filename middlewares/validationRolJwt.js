const { response, request } = require("express");
const jwt = require("jsonwebtoken");



const validationRolJwt= async (req = request, res = response, next) => {

    auth = req.authUser.dataValues;
    if(auth.rolId != 1){
        return res.status(401).json({errror: "the user is not  admin. only the admin users can do this action"});
    }

    next();
};

module.exports = {
    validationRolJwt
};
