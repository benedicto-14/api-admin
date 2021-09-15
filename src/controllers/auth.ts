import { Request, Response } from "express";
import { error500 } from "../helpers";
import { userModel } from "../models/usuario";
import bcrypt from 'bcrypt';
import { generarJWT } from "../helpers/jwt";

const noValido = (res:Response) => {
    return res.status(404).json({
        ok:false,
        msg:'correo o contraseña no valida'
    });
}

export const login = async (req:Request, res:Response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const userDB:any = await userModel.findOne({email});
        if( !userDB ){
            noValido(res);
        }

        //Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, userDB.password);
        if(!validarPassword){
            noValido(res);
        }

        //Generar token
        const token = await generarJWT( userDB.id );

        res.json({
            ok:true,
            token
        });
        
    } catch (error) {
        error500(res);
    }
}