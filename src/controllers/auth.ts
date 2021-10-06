import { Request, Response } from "express";
import { error500 } from "../helpers";
import { userModel } from "../models/usuario";
import bcrypt from 'bcrypt';
import { generarJWT } from "../helpers/jwt";
import { googleVerify } from "../helpers/google-verify";

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

export const loginGoogle = async (req:Request, res:Response) => {

    const googleToken = req.body.token;

    try {

        const info:any = await googleVerify(googleToken);
        const email = info.email;
        const userDB:any = await userModel.findOne({email});
        let user:any;

        if(!userDB){
            //si no existe el usuario
            user = new userModel({
                nombre:info.name,
                email,
                password: '@@@',
                img:info.picture,
                google:true
            });
        }else{
            //existe usuario
            user = userDB;
            user.google = true;
        }

        //Guardar usuariodb
        await user.save();

        //Generar token
        const token = await generarJWT( user.id );

        res.json({
            ok:true,
            token
        });
        
    } catch (error) {
        error500(res);
    }
}

export const refreshToken = async (req:Request | any, res:Response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);
    

    res.json({
        ok:true,
        token
    })

}