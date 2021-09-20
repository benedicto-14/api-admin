import { Router } from "express";
import { loadFile, mostrarImagen } from "../controllers/upload";
import { validarJWT } from "../middlewares/validar-jwt";

import fileUpload from 'express-fileupload';

/* 
EndPoint: /api/upload
*/

const uploadRoutes = Router();

uploadRoutes.use( fileUpload() );

uploadRoutes.put('/:tipo/:id', validarJWT, loadFile);
uploadRoutes.get('/:tipo/:foto', validarJWT, mostrarImagen);

export default uploadRoutes;