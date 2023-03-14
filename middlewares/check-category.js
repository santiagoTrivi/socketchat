
const { Category } = require("../models/categoryData");


const checkCategory = async (category) =>{
    console.log('getting the category')
    const valid = await Category.findOne({ where: { category} });
    console.log(valid);
    //console.log(valid.dataValues);
    if(!valid){
        throw new Error('wrong category');
    }

}


module.exports = {
    checkCategory
};