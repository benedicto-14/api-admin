import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const validarJWT = (req:Request | any, res:Response, next:NextFunction) => {

    //get token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'falta token en la peticion'
        });
    }

    try {
    
        const key:any = process.env.SECRET_JWT;
        const decode:any = jwt.verify(token, key);
        req.uid = decode.uid;
        next();

    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg: 'token no valido'
        });
        
    }

}