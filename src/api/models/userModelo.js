const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const salt = 10; //complejidad del encriptado

const userSchema = new mongoose.Schema(
    {
        name: {type: String, unique: true, trim:true, required: true},
        password: {type: String, trim:true, required: true}
    }
)
userSchema.pre("save", (next)=>{
    if(this.password){
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next()
});

const User = mongoose.model("users", userSchema)
module.exports= User;