import { Router } from "express";
import { check } from 'express-validator';
import * as Controller from "../controllers/hospital";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

/* 
EndPoint: /api/hospital
*/

const hospitalRoutes = Router();

hospitalRoutes.get('/', Controller.getHospital);
hospitalRoutes.post('/',
    [
        validarJWT,
        check('nombre','el nombre es requerido').not().isEmpty(),
        validarCampos
    ],
    Controller.createHospital
);
hospitalRoutes.put('/:id',
    [
        validarJWT,
        check('nombre','el nombre es requerido').not().isEmpty(),
        validarCampos
    ],
    Controller.updateHospital
);
hospitalRoutes.delete('/:id',
    validarJWT,
    Controller.deleteHospital
);

export default hospitalRoutes;