import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { userModel } from "../models/usuario";

export const getUser = async (req:Request, res:Response) => {

    const usuarios = await userModel.find({}, 'nombre email role');

    res.json({
        ok:true,
        usuarios
    });

}

export const createUser = async (req:Request, res:Response) => {

    const { email, password, nombre } = req.body;

    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }

    try {

        const existeEmail = await userModel.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado',
            })
        }
        
        const usuario = new userModel(req.body);
        await usuario.save();
    
        res.json({
            ok:true,
            usuario
        });

    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'Error inesperado revisar logs'
        });

    }


}