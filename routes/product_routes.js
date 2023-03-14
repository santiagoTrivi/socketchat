const {Router} = require('express');
const { check } = require('express-validator');
const { getProduct, getProductById, postProduct, putProduct, deleteProduct } = require('../controllers/product_controllers');

const { validationjwt, validationSellerRolKwt, checkCategory, fieldCheck } = require('../middlewares');



const router = Router();




router.get('/',getProduct);

router.get('/:id',getProductById);


router.post('/' , [validationjwt, validationSellerRolKwt, check('category').custom(checkCategory)], fieldCheck, postProduct);


router.put('/:id', putProduct);


router.delete('/:id', [validationjwt, validationSellerRolKwt] , deleteProduct);


module.exports = router;