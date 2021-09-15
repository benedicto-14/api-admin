import { Response } from 'express';

export const error500 = (res:Response) => {
    res.status(500).json({
        ok:false,
        msg:'Error inesperado revisar logs'
    });
}