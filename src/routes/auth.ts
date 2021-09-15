import { Router } from "express";
import { check } from 'express-validator';
import { login } from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";

/* 
EndPoint: /api/login
*/

const authRoutes = Router();

authRoutes.post('/', 
    [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ], 
    login
);

export default authRoutes;