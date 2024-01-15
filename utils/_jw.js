const jwt = require("jsonwebtoken")
const HTTPSTATUSCODE = require("./httpstatuscode")
const isAuth = (req, res, next)=>{
    const authorization = req.headers.authorization
    if(!authorization){
        return res.json({status: 401, message: HTTPSTATUSCODE[401], data: null})
    }
    const splits = authorization.split(" ")
    if(splits.length !=2 || splits[0] !="Bearer"){
        return res.json({status: 400, message: HTTPSTATUSCODE[400], data: null})
    }
    const jwtString = splits[1] //en esta variable se guarda la parte que contiene la info del token
    try{
        var token = jwt.verify(jwtString, req.app.get("secretKey")); //verificamos que el token tiene una firma correcta
    }catch(error){
        return next(error)
    }
    const authority = {id: token.id, name: token.name}
    req.authority = authority
    next()
}

module.exports ={isAuth}

