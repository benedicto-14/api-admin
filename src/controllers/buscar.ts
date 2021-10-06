import { Request, Response } from "express";
import { error500 } from "../helpers";
import { hospitalModel } from "../models/hospital";
import { medicoModel } from "../models/medico";
import { userModel } from "../models/usuario";

export const buscar = async (req:Request, res:Response) => {

    const query = req.params.query;
    const regex = new RegExp(query, 'i');

    try {
        const [usuarios,medicos,hospitales] = await Promise.all(
            [
                userModel.find({nombre:regex}),
                medicoModel.find({nombre:regex}),
                hospitalModel.find({nombre:regex})
            ]
        );
    
        res.json({
            ok:true,
            usuarios,
            medicos,
            hospitales
        });
    } catch (error) {
        error500(res)
    }
    
}

export const buscarColeccion = async (req:Request, res:Response) => {

    const tabla = req.params.tabla;
    const query = req.params.query;
    
    const regex = new RegExp(query, 'i');
    let resultados = [];

    switch (tabla) {
        case 'medico':
            
            resultados = await medicoModel.find({nombre:regex})
            .populate('usuario', 'nombre img').populate('hospital', 'nombre img');
        
            break;
        case 'hospital':

            resultados = await hospitalModel.find({nombre:regex})
            .populate('usuario', 'nombre img');
            
            break;
        case 'usuario':

            resultados = await userModel.find({nombre:regex});
            
            break;
    
        default:

            return res.status(400).json({
                ok:false,
                msg:'las tablas tiene que tener algun medico|hospital|usuario'
            });
    }

    res.json({
        ok:true,
        resultados
    })

}