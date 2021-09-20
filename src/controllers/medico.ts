import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { error500 } from "../helpers";
import { generarJWT } from "../helpers/jwt";
import { medicoModel } from "../models/medico";

export const getMedico = async (req:Request, res:Response) => {

    const medicos = await medicoModel.find()
    .populate('usuario','nombre img')
    .populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
    });

}

export const createMedico = async (req:Request | any, res:Response) => {

    const uid = req.uid;
    const medico = new medicoModel({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();
        res.json({
            ok:true,
            medico:medicoDB
        });
        
    } catch (error) {
        error500(res);
    }

}

export const updateMedico = async (req:Request, res:Response) => {
    
    res.json({
        ok:true,
        msg:'Medico'
    });

}

export const deleteMedico = async (req:Request, res:Response) => {

    res.json({
        ok:true,
        msg:'Medico'
    });

}