import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { userModel } from "../models/usuario";
import { error500 } from "../helpers";
import { generarJWT } from "../helpers/jwt";

export const getUser = async (req:Request | any, res:Response) => {

    const usuarios = await userModel.find({}, 'nombre email role');

    res.json({
        ok:true,
        usuarios,
        uid: req.uid
    });

}

export const createUser = async (req:Request, res:Response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await userModel.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado',
            })
        }
        
        const usuario:any = new userModel(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar usuario
        await usuario.save();

        //generar token
        const token = await generarJWT(usuario.id);
    
        delete usuario.password;
        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {
        error500(res);
    }


}

export const updateUser = async (req:Request, res:Response) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB:any = await userModel.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe usuario'
            });
        }

        //Actualizar
        const { password, google, email, ...campos } = req.body;

        if(usuarioDB.email !== email){

            const existeEmail = await userModel.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                });
            }

        }

        campos.email = email;
        const userUpdate = await userModel.findByIdAndUpdate(uid,campos);

        res.json({
            ok:true,
            usuario:userUpdate
        })
        
    } catch (error) {
        error500(res);
    }

}

export const deleteUser = async (req:Request, res:Response) => {

    const uid = req.params.id;

    try {

        const usuarioDB:any = await userModel.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe usuario'
            });
        }

        //Eliminar usuario
        await userModel.findByIdAndRemove(uid);

        res.json({
            ok:true,
            msg: 'usuario eliminado'
        });
        
    } catch (error) {
        error500(res);
    }

}