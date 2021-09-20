import express from "express";
import cors from 'cors';

import { conectarDB } from "./database/config";
import dotenv from 'dotenv';

import userRoutes from "./routes/usuario";
import authRoutes from "./routes/auth";
import hospitalRoutes from "./routes/hospital";
import medicoRoutes from "./routes/medico";
import buscarRoute from "./routes/buscar";
import uploadRoutes from "./routes/upload";

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
app.use('/api/hospital',hospitalRoutes);
app.use('/api/medico',medicoRoutes);
app.use('/api/buscar',buscarRoute);
app.use('/api/upload',uploadRoutes);

//Obtiene puerto
const puerto = process.env.PORT;

//Inicia el servidor
app.listen(puerto, () => {
    console.log(`Server running port:${puerto}`);
});