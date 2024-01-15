const express = require("express");
const userRouter = express.Router();
const {createUser, authenticate, logout, getUsers}= require("../controllers/user.controller");
const {isAuth} = require("../middlewares/auth.middlewares");

userRouter.post("/register", createUser)
userRouter.post("/authenticate", authenticate)
userRouter.post("/logout", logout)
userRouter.get("/", [isAuth], getUsers)

module.exports = userRouter;