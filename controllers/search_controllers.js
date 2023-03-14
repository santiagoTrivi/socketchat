const { request, response } = require("express");
const {Op} = require("sequelize");
const { database } = require("../db/orm_connection");
const { User, Category, Product } = require("../models");


const searchUser = async (term = '', res = response) =>{
    
    // where:{$or: [{name: {$iLike: {$in: term}}}, {email: {$iLike: {$in: term}}} ]}
    
    try {
        const users = await User.findAll({where:{
            [Op.or]:[
                {
                    name: {[Op.substring]: term}
                },
                {
                    email: {[Op.substring]: term}
                }
            ],
            [Op.and]:[
                {
                    status: 1
                }
            ]
        }});
        res.json({
            result: (users) ? [users] : []
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const searchCategory = async (term = '', res = response) =>{
    
    
    try {
        const categories = await Category.findAll({where:{
            [Op.or]:[
                {
                    id: {[Op.substring]: term}
                },
                {
                    category: {[Op.substring]: term}
                }
            ],
            [Op.and]:[
                {
                    status: 1
                }
            ]
        }, include: User});
        res.json({
            result: categories
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const searchProduct = async (term = '', res = response) =>{
    
    
    try {
        const products = await Product.findAll({where:{
            [Op.or]:[
                {
                    product: {[Op.substring]: term}
                },
                {
                    unitPrice: {[Op.substring]: term}
                },
                {
                    description: {[Op.substring]: term}
                }
            ],
            [Op.and]:[
                {
                    available: 1
                }
            ]
        }, include: [{model: User}, {model: Category}]});
        res.json({
            result: products
        });
    } catch (error) {
        res.status(500).json(error);
    }
};


const getSearch = async (req = request, res = response) =>{

    const {collection, term} = req.params;
    
    switch (collection){
        
    case 'user':
        searchUser(term, res);
    break;
        
    case 'category':
        searchCategory(term, res);
    break;

    case 'product':
        searchProduct(term, res);
    break; 
    
    default:
        res.status(500).json({
            message: 'incorrect search, try again'
        })
    };
};

module.exports = {
    getSearch
};