const express = require('express');
const authMiddleware = require('../middleware/auth.js');
const UserController = require('../controllers/user.js');
const inputMiddleWare = require('../middleware/inputValidation.js');

const userRouter = express.Router();

userRouter.post('/register',inputMiddleWare, UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/reset-password', UserController.resetPassword);
userRouter.delete('/deactivate', authMiddleware, UserController.deactivateAccount);


userRouter.get('/profile', authMiddleware, UserController.getProfile);
userRouter.put('/profile', authMiddleware, UserController.updateProfile);
// userRouter.delete('/profile', authMiddleware, UserController.deleteProfile);

module.exports = userRouter;