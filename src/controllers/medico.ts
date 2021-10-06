import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { error404, error500 } from "../helpers";
import { generarJWT } from "../helpers/jwt";
import { medicoModel } from "../models/medico";
import { hospitalModel } from "../models/hospital";

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
    const existe = await hospitalModel.findById(req.body.hospital);

    if(!existe){

        error404(res,'Hospital');

    }else{
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



}

export const updateMedico = async (req:Request | any, res:Response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {        

        const [hospital, medico] = await Promise.all([
            hospitalModel.findById(req.body.hospital),
            medicoModel.findById(id)
        ]);
        
        if(!hospital){ 
            error404(res,'Hospital'); 
        }else if(!medico){
            error404(res,'Medico');
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        
        const medicoActualizado = await medicoModel.findByIdAndUpdate(id, cambiosMedico, { new:true });
        
        res.json({
            ok:true,
            medico:medicoActualizado
        });

    } catch (error) {
        error500(res);
    }
    

}

export const deleteMedico = async (req:Request, res:Response) => {

    const id  = req.params.id;

    try {

        const medcio = await medicoModel.findById(id);
        if(!medcio) error404(res,'Medico');

        await medicoModel.findByIdAndDelete( id );
        
        res.json({
            ok:true,
            msg:'medico eliminado'
        });
        
    } catch (error) {
        error500(res);
    }

}