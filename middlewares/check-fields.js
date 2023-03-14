const {validationResult} = require('express-validator');
const {User,Rol} = require('../models/userData');


const fieldCheck = (req, res, next) => {
    const output = validationResult(req);
    if(!output.isEmpty()){
        return res.status(400).json(output);
    }

    next(); // Another funtion that only will be executed if the  condition is not executed, meaning if 'return ' is never executed
}

const rolValid = async (rol) =>{
    const valid = await Rol.findOne({ where: { rol} });
    console.log(valid);
    if(!valid){
        throw new Error('wrong rol');
    }
}

const emailvalid = async (email) =>{
    const valid = await User.findOne({ where: { email} });
    console.log(valid);
    if(valid){
        throw new Error('the email is already registered');
    }
}



module.exports ={
    fieldCheck,
    rolValid,
    emailvalid
}