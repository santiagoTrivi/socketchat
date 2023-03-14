const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userData");


const validationjwt= async (req = request, res = response, next) => {

    

    try {

        const token = req.header('Authorization');
        if(!token){
            return res.status(401).json({error: "no authentication"});
        }
        
        const { uid } = await jwt.verify(token, process.env.SECRETKEY);
        
        const authUser = await User.findByPk(uid);

        // validate if the authUser is null or not using return
        
        if(!authUser.dataValues){
            return res.status(401).json({errror: "user not fount"});
        }

        // validate if the authUser status is false or not using return 
        
        if(!authUser.dataValues.status){
            return res.status(401).json({error: "user not valid, try later"});
        }
        

        req.uid = uid;
        req.authUser = authUser;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "token not valid"});
    }

    
    

};

module.exports = {
    validationjwt
};
