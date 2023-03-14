const { response, request } = require("express");
const jwt = require("jsonwebtoken");



const validationSellerRolKwt= async (req = request, res = response, next) => {

    auth = req.authUser.dataValues;

    if(auth.rolId !== 3){
        res.status(401).json({errror: "the user is not  Seller. only the seller users can do this action"});
    }

    next();
};

module.exports = {
    validationSellerRolKwt
};