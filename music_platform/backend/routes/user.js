const express = require('express');
// const authMiddleware = require('../middleware/auth.js');
const UserController = require('../controller/user.js');

const userRouter = express.Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);


module.exports = userRouter;