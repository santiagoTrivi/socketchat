const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const {User, Rol} = require('../models');
//const bodyparser = require('body-parser');


const userGet = async (req = request, res = response)=>{
    const {limit = 5} = req.query;
    const users = await User.findAll({ where: { status: 1 }, limit: Number(limit) });
    const total = await User.count({ where: { status: 1 } });
    res.json( {total, users});
    //res.render('index');
}

const userGetBYId = async (req = request, res = response)=>{
    const id = req.params.id;
    const user = await User.findByPk( id );
    res.json({ user });
    //res.render('index');
}

const userPost = async (req = request, res = response)=>{
    let {name, email, password, rol} = req.body;
    const rl = await Rol.findOne({ where: { rol} });
    const rolId= rl.id;
    
    const salt = bcryptjs.genSaltSync(10);
    password = bcryptjs.hashSync(password, salt);
  
    try {
        const user = new User({name, email, password, rolId});
        await user.save();
        res.json({user});
    } catch (error) {
        res.status(500).json({error});
    }

     
}

const userPut = async (req = request, res = response)=>{
    const id = req.params.id;
    let { password, rol} = req.body;
    
    try {
        const user = await User.findByPk(id);
    

        if(password){
            const salt = bcryptjs.genSaltSync(10);
            user.password = bcryptjs.hashSync(password, salt);
        }

        if(rol){
            const rl = await Rol.findOne({ where: { rol} });
            user.rol_id = rl.id;

        }
        user.save();


        res.json({
            msj: "put api - controller",
            user
        });

    } catch (error) {
        res.status(400).json({error: "user not found"});
    }
    
}

const userPatch = (req = request, res = response)=>{
    res.json({
        msj: "patch api - controller"
    });
}


const userDelete = async (req = request, res = response)=>{
    const id = req.params.id;
    const uid = req.uid;
    const authnticatedUser = req.authUser;
    try {
        const user = await User.findByPk(id);
    
        user.set({status: 0});
        user.save();

        res.json({
            msj: "the user has been deleted successfully",
            user,
            authnticatedUser
        });
        
    } catch (error) {
        res.status(400).json({error: "user not found"});
    }
}

module.exports = {
    userGet,
    userGetBYId,
    userPost,
    userPut,
    userPatch,
    userDelete
}