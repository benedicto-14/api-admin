import express from "express";
import cors from 'cors';
import { conectarDB } from "./database/config";
import userRoutes from "./routes/usuario";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth";

dotenv.config();

//Crear servidor express
const app = express();

//Configuracion de cors
app.use(cors());

//Leer peticiones con json
app.use(express.json());

//conectar db
conectarDB();

//Rutas
app.use('/api/usuarios',userRoutes);
app.use('/api/login',authRoutes);

//Obtiene puerto
const puerto = process.env.PORT;

//Inicia el servidor
app.listen(puerto, () => {
    console.log(`Server running port:${puerto}`);
});