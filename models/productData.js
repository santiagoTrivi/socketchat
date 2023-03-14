const {DataTypes} = require('sequelize');
const {database}= require('../db/orm_connection');
const { Category } = require('./categoryData');
const { User } = require('./userData');


const Product = database.define('Product',{

    product: {
        type: DataTypes.STRING
    },
    unitPrice: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.STRING
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'id'
        }
    },
    img: {
        type: DataTypes.STRING
    }
   
});

User.hasOne(Product);
Product.belongsTo(User);

Category.hasOne(Product);
Product.belongsTo(Category);


module.exports = {
    Product
};