const { Router } = require('express');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/userController');

const router = Router();

router.get('/', userGet);

router.get('/:id', userGet);

router.post('/', userPost);

router.put('/', userPut);

router.patch('/', userPatch);

router.delete('/', userDelete);



module.exports = router;