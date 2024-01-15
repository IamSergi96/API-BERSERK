//librerias
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
//mis componentes
const HTTPSTATUSCODE = require("./utils/httpstatuscode");
const characterRouter = require("./src/api/routes/personajeRoutes");
const userRouter = require("./src/api/routes/userRoutes")
const { connectMongo } = require("./utils/database");

const app = express();
connectMongo();

//mongoSanitze es una libreria que ayuda contra la inyeccion de codigo malicioso formato mongo
app.use(mongoSanitize()); 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

//CORS: Cross-Origin Resource Sharing: es un mecanismo de seguridad para restringir las solicitudes HTTP entre diferentes dominios
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    credentials: true
}));

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");

/* RUTAS*/
app.use("/api/characters", characterRouter);
app.use("/api/users", userRouter);

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to my server", app: "Berserk Characters App" });
});

// Manejo de errores
app.use((req, res, next) => {
    let error = new Error();
    error.status = 404;
    error.message = HTTPSTATUSCODE[404];
    next(error);
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
});

// Ocultar al usuario las bases de la creación de la app
app.disable("x-powered-by");

// Listen y puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Escuchando el puerto http://localhost:${PORT}`);
});
