const  path  = require('path');
const fs = require('fs');
const { request, response } = require("express");
const { uploadFiles } = require("../helpers");
const { User } = require("../models/userData");
const { Product } = require("../models/productData");

const uploadfile = async (req = request, res = response) =>{

    try {
        //const pathFile = await uploadFiles(req.files, ['txt', 'md'], 'texts');
        const fileName = await uploadFiles(req.files, undefined, 'imgs');
        res.json({
            fileName
        })
        
    } catch (error) {
        res.status(400).json({
            message: 'error',
            error
        });
    }
};

const imgUpdate = async (req = request, res = response) =>{

    const {collection, id} = req.params;
    let modelo;

    switch (collection) {
        case 'user':
            modelo = await User.findByPk(id);

            if(!modelo){
                return res.status(400).json({message: `the users ${id} does not exist`});
            }

            break;
        case 'product':
            modelo = await Product.findByPk(id);

            if(!modelo){
                return res.status(400).json({message: `the product ${id} does not exist`});
            }

            break;
        
        default:
            return res.status(500).json({message: 'part not developed'})
 
            
    }

    if (modelo.img){
        const pathFile = path.join(__dirname, '../uploads', collection, modelo.img);
        if(fs.existsSync(pathFile)){
            fs.unlinkSync(pathFile);
        };
    };
    
    const fileName = await uploadFiles(req.files, undefined, collection);
    modelo.img = fileName;
    modelo.save();

    res.json({
        modelo
    })
};


const getPicture = async(req = request, res = response) =>{

    const {collection, id} = req.params;
    let modelo;

    switch (collection) {
        case 'user':
            modelo = await User.findByPk(id);

            if(!modelo){
                return res.status(400).json({message: `the users ${id} does not exist`});
            }

            break;
        case 'product':
            modelo = await Product.findByPk(id);

            if(!modelo){
                return res.status(400).json({message: `the product ${id} does not exist`});
            }

            break;
        
        default:
            return res.status(500).json({message: 'part not developed'})
 
            
    }

    if (modelo.img){
        const pathFile = path.join(__dirname, '../uploads', collection, modelo.img);
        if(fs.existsSync(pathFile)){
            return res.sendFile(pathFile);
        };
    };


    const pathFileNoFound = path.join(__dirname, '../assets', 'index.jpg');
    if(fs.existsSync(pathFileNoFound)){
        return res.sendFile(pathFileNoFound);
    };

    res.json({message: 'error'});
};

module.exports = {
    uploadfile,
    imgUpdate,
    getPicture
};