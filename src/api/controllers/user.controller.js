const User = require("../models/personajeModelo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const HTTPSTATUSCODE = require("../../../utils/httpstatuscode")

const createUser = async(req, res, next)=>{
    try{
        const user = new User;
        user.name = req.body.name;
        user.password = req.body.password;

        if(await User.findOne({name: req.body.name})){
            return res.status(400).json({status:400, message: "This user already exists", data: null})
        }
        await user.save();
        return res.status(201).json({status: 201, message: HTTPSTATUSCODE[201], data: null})
    }catch(error){
        next(error)
    }
}

const authenticate = async (req, res, next)=>{
    try{
        const userInfo = await User.findOne({name: req.body.name})
        if(userInfo.password == req.body.password){
            userInfo.password = null
            const token = jwt.sign(
                {id: userInfo._id, name: userInfo.name},
                req.app.get("secretKey"),
                {expiresIn: "1d"} //normalmente pondriamos 1h aprox, pero para no complicar el proyecto ponemos 1 dia
            );
            return res.json({status: 200, message: HTTPSTATUSCODE[200], data:{user: userInfo, token: token}});
        }else{
            return res.json({status:400, message: HTTPSTATUSCODE[400], data: null});
        }
    }catch(error){
        return next(error)
    }
}

const logout = (req,res,next)=>{
    try{
        return res.json({status:200, message: HTTPSTATUSCODE[200], token: null})
    }catch(error){
        return next(error)
    }
}

const getUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
        res.status.json({status:200, message: HTTPSTATUSCODE[200], data: users});
    }catch(error){
        return next(error)
    }
}

module.exports={createUser, authenticate, logout, getUsers}