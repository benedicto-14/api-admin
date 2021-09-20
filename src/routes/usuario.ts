import { Router } from "express";
import { check } from 'express-validator';
import * as Controller from "../controllers/usuario";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

/* 
EndPoint: /api/usuarios
*/

const userRoutes = Router();

userRoutes.get('/', validarJWT, Controller.getUser);
userRoutes.post('/',
    [
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('password','El password es requerido').not().isEmpty(),
        check('email','El email es requerido').isEmail(),
        validarCampos
    ],
    Controller.createUser
);
userRoutes.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('email','El email es requerido').isEmail(),
        check('role','El rol es requerido').not().isEmpty(),
        validarCampos
    ],
    Controller.updateUser
);
userRoutes.delete('/:id',
    validarJWT,
    Controller.deleteUser
);

export default userRoutes;