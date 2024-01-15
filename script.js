const express = require("express");
const HTTPSTATUSCODE = require("./utils/httpstatuscode");
const characterRouter = require("./src/api/routes/personajeRoutes");
const { connectMongo } = require("./utils/database");
const app = express();
connectMongo();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Headers para Postman y otros clientes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rutas
app.use("/api/characters", characterRouter);

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
