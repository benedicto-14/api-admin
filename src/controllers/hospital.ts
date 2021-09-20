import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { error500 } from "../helpers";
import { generarJWT } from "../helpers/jwt";
import { hospitalModel } from "../models/hospital";

export const getHospital = async (req:Request, res:Response) => {

    const hospitales = await hospitalModel.find().populate('usuario','nombre img');

    res.json({
        ok:true,
        hospitales
    });

}

export const createHospital = async (req:Request | any, res:Response) => {

    const uid = req.uid;
    const hospital = new hospitalModel({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok:true,
            hospital:hospitalDB
        });
        
    } catch (error) {
        error500(res);
    }

}

export const updateHospital = async (req:Request, res:Response) => {
    
    res.json({
        ok:true,
        msg:'hospital'
    });

}

export const deleteHospital = async (req:Request, res:Response) => {

    res.json({
        ok:true,
        msg:'hospital'
    });

}