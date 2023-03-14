const {DataTypes} = require('sequelize');
const {database} = require('../db/orm_connection');
const { User } = require('./userData');

const Category = database.define('Category',{
    id: {
        type: DataTypes.INTEGER,
        require: false,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING
    },
    userID: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.TINYINT
    },
    /** 
    
    

    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id'
        }
    }
    */
});

User.hasOne(Category);
Category.belongsTo(User);

module.exports = {
    Category
};