const {Router} = require('express');
const { check } = require('express-validator');
const { Userlogin, googleSingIn, authUserByToken } = require('../controllers/auth_controllers');
const { validationjwt } = require('../middlewares');
const {fieldCheck} = require('../middlewares/check-fields');
const router = Router();


router.post('/login', [check('email', 'invalid email').isEmail(),
check('password', 'the password is required').not().isEmpty(), ],
fieldCheck , Userlogin);

router.post('/google', [check('id_token', 'id toke required').not().isEmpty()],
fieldCheck , googleSingIn);

router.get('/', validationjwt, authUserByToken);



module.exports = router;