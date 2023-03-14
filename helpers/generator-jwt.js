const jwt = require("jsonwebtoken");
const { User } = require("../models");


const generatorjwt = (uid) =>{

    return new Promise( (resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '5h'}, (err, token)=>{
            if(err){
                console.log(err);
                reject('the token could not be generaterd');
            }else{
                resolve(token);
            }
        });
    });

}


const checkJwtFrontend = async(token = '') => {

    try {
        if(token.length < 10){
            return null
        };
        const {uid} = await jwt.verify(token, process.env.SECRETKEY);

        let user = await User.findByPk(uid);
        
        if(!user) return null;

        if(!user.status) return null;
        
        return user;

    } catch (error) {
        return null;
    }

};

module.exports ={
    generatorjwt,
    checkJwtFrontend
}