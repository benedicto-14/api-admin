import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { error404, error500 } from "../helpers";
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

export const updateHospital = async (req:Request | any, res:Response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await hospitalModel.findById( id );
        if(!hospital) error404(res,'Hospital');

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await hospitalModel.findByIdAndUpdate( id, cambiosHospital, { new:true } );
        
        res.json({
            ok:true,
            hospital:hospitalActualizado
        });

    } catch (error) {
        error500(res);
    }

}

export const deleteHospital = async (req:Request, res:Response) => {

    const id  = req.params.id;

    try {

        const hospital = await hospitalModel.findById( id );
        if(!hospital) error404(res,'Hospital');

        await hospitalModel.findByIdAndDelete( id );
        
        res.json({
            ok:true,
            msg:'hospital eliminado'
        });

    } catch (error) {
        error500(res);
    }

}