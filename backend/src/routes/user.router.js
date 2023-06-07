const router = require('express').Router();
const userController = require('../controllers/user.controller')
const jwt = require('../middleware/jwt')

router.get('/getuser',userController.getUserAll)
router.get('/getuser/:id',userController.getUserById)
router.post('/getuserbyusername',userController.getUserByUsername)
router.post('/login', userController.loginUser)
router.post('/register', userController.addUser) 
router.put('/update', jwt.verifyToken, userController.updateUser)
router.delete('/delete', userController.deleteUser)


module.exports = router