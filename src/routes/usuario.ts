import { Router, Request, Response } from "express";
import { check } from 'express-validator';
import * as Controller from "../controllers/usuario";

/* 
EndPoint: '/api/usuarios'
*/

const userRoutes = Router();

userRoutes.get('/',Controller.getUser);
userRoutes.post('/',
    [
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('password','El password es requerido').not().isEmpty(),
        check('email','El email es requerido').isEmail()
    ],
    Controller.createUser
);

export default userRoutes;