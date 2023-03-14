const {Router} = require('express');
const { check } = require('express-validator');
const {uploadfile, imgUpdate, getPicture} = require('../controllers/upload_controllers');
const { allowedCollections } = require('../helpers');
const { fieldCheck, checkFile } = require('../middlewares');
const router = Router();

router.post('/', checkFile, uploadfile);

router.put('/:collection/:id', [checkFile , check('collection').custom( c => allowedCollections( c, ['user', 'product']))], fieldCheck ,imgUpdate);

router.get('/:collection/:id', [check('collection').custom( c => allowedCollections( c, ['user', 'product']))], fieldCheck, getPicture);

module.exports = router;