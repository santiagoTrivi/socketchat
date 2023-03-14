const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const { User} = require('../models');
const {generatorjwt} = require('../helpers/generator-jwt');
const { verify } = require('../helpers/googleVerify');



const Userlogin = async (req = request, res = response) =>{
    const {password, email} = req.body;

    
    try {
        // checking fi the email is the database
        let user = await User.findOne({where: {email}});
        if(!user){
            return res.json({error: "user not registered"});
        }

        //checking if the status is false
        if(user.status == 0){
            return res.json({error: "error - user not registered"});
        }

        //validate the password
        const passwordcheck = await bcryptjs.compare(password, user.password);
        if(!passwordcheck){
            return res.json({error: "user / password incorrect. try again"});
        }

        //creating the token
        const token = await generatorjwt(user.id);    
        
        res.json({
            message: "welcome to login",
            user,
            token});

    } catch (error) {
        res.status(400).json({error: "invalid - something went wrong"});
    }




};

const googleSingIn = async (req = request, res = response) =>{

    const {id_token} = req.body;

    try {
        const {given_name, email, img} = await verify(id_token);
        let user = await User.findOne({where:{email}});

        if(!user){
            user = await new User({name: given_name, email, password: email, img, google: true });
            user.save();
        }

        if(!user.status){
            return res.status(401).json({
                message: 'user status denied'
            })
        }

        const token = await generatorjwt(user.id);

        res.json({
            message: "Correct response",
            user,
            token
        });
        
    } catch (error) {
        res.status(400).json({error: 'token not valid', error});
    }

    

};

const authUserByToken = async(req = request, res = response) => {
    const {authUser, uid} = req;
    const sessionToken = await generatorjwt(uid);

    res.json({
        authUser,
        sessionToken
    });
}


module.exports = {
    Userlogin,
    googleSingIn,
    authUserByToken
};