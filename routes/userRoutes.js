const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

//getting user data | get
router.get('/getUser', authMiddleware, getUserController)

//update | 
router.put('/updateUser', authMiddleware, updateUserController)

//update password
router.put('/updatePassword', authMiddleware, updatePasswordController)

//reset password 
router.post('/resetPassword', authMiddleware, resetPasswordController)

//delete user
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)

module.exports = router