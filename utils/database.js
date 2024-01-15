const mongoose= require("mongoose");
const MONGO_URI = "mongodb+srv://sergimataslargo123:Trisergi96!@cluster0.nwsxd5m.mongodb.net/?retryWrites=true&w=majority"
const connectMongo = async ()=>{
    try{
        const conexion = await mongoose.connect(MONGO_URI);
        console.log("INFO: Connexión correcta a la base de datos:", conexion.connection.name);
    }catch(error){
        console.error("Error de conexión a la base de datos ->", error.message);
    }
}
module.exports = { connectMongo };