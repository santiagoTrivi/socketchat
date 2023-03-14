const {Router} = require('express');
const {userGet, userGetBYId, userPost, userPut, userPatch, userDelete} = require('../controllers/user_controllers');
const {check} = require('express-validator');
const {fieldCheck, rolValid, emailvalid, validationjwt, validationRolJwt} = require('../middlewares');


const router = Router();

router.get('/', userGet);
router.get('/:id', userGetBYId);

router.put('/:id', [check('password', 'Weak password').isLength({min: 8}),
                    check('rol').custom( rolValid)
                    ],
                    fieldCheck , userPut);

router.post('/', [check('email', 'invalid email').isEmail(),
                check('name', 'the name is required').not().isEmpty(),
                check('password', 'Weak password').isLength({min: 8}),
                check('rol').custom( rolValid),
                check('email').custom( emailvalid)
                ],
                fieldCheck ,userPost);

router.patch('/', userPatch)

router.delete('/:id', [validationjwt, validationRolJwt] , userDelete);

module.exports = router;