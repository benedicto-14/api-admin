import { Router } from "express";
import { check } from 'express-validator';
import { login, loginGoogle, refreshToken } from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

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
authRoutes.post('/google',
    [
        check('token', 'El token de google es requerido').not().isEmpty(),
        validarCampos
    ], 
    loginGoogle
);
authRoutes.get('/refresh',
    validarJWT,
    refreshToken
);

export default authRoutes;