const {Router} = require('express');
const { getSearch } = require('../controllers/search_controllers');
const router = Router();



router.get('/:collection/:term', getSearch);



module.exports = router;