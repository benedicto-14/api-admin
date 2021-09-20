import { Router } from "express";
import { buscar, buscarColeccion } from "../controllers/buscar";
import { validarJWT } from "../middlewares/validar-jwt";

/* 
EndPoint: /api/buscar
*/

const buscarRoute = Router();

buscarRoute.get('/:query',validarJWT,buscar);
buscarRoute.get('/colecion/:tabla/:query',validarJWT,buscarColeccion);

export default buscarRoute;