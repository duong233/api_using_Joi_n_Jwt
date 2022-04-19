const {create,getAllUser,getUserById,deleteUser,updateUser} = require('./user.controller');
const router = require('express').Router();

router.get('/user', getAllUser);
router.get('/user/:id', getUserById);
router.post('/register', create);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);

module.exports = router;