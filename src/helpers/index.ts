import { Response } from 'express';

export const error500 = (res:Response) => {
    return res.status(500).json({
        ok:false,
        msg:'Error inesperado revisar logs'
    });
}

export const error404 = (res:Response, tipo:string = 'Registro') => {
    return res.status(404).json({
        ok:false,
        msg:tipo+' no encontrado'
    });
}