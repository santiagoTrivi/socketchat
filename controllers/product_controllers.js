const { request, response } = require("express");
const { Category, Product, User } = require("../models");





const getProduct = async(req = request, res = response) => {

    try {
        const products = await Product.findAll({where: {available: 1}, include: [{model: Category}, {model: User}]});
        res.json({
            message: 'correct response',
            products
        });
    } catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
    


};

const getProductById = async(req = request, res = response) => {

    const {id} = req.params;

    try {
        const product = await Product.findByPk(id, {where: {available: 1}, include: [{model: Category}, {model: User}]});
        res.json({
            message: 'correct response',
            product
        });
    } catch (error) {
        console.log(error);
        res.json({
            error
        })
    }

    


};

const postProduct = async (req = request, res = response) => {

    let {product, unitPrice, description, category} = req.body;
    const admin = req.authUser;
    const UserId = admin.id;

    try {
        const {dataValues} = await Category.findOne({ where: { category} });
        const categoryId = dataValues.id;
        const newProduct = new Product({product, unitPrice, description, UserId, categoryId});
        await newProduct.save();
        res.json({
            message: 'correct response',
            newProduct
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
    


};

const putProduct = (req = request, res = response) => {

    const {id} = req.params;

    res.json({
        message: 'correct response',
        id
    });


};

const deleteProduct = (req = request, res = response) => {


    res.json({
        message: 'correct response'
    });


};

module.exports = {
    getProduct,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
};