import { Router } from "express";
import { check } from 'express-validator';
import * as Controller from "../controllers/medico";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

/* 
EndPoint: /api/medico
*/

const medicoRoutes = Router();

medicoRoutes.get('/', Controller.getMedico);
medicoRoutes.post('/',
    [
        validarJWT,
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('hospital','el hospital es requerido').isMongoId(),
        validarCampos
    ],
    Controller.createMedico
);
medicoRoutes.put('/:id',
    [
        validarJWT,
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('hospital','el hospital es requerido').isMongoId(),
        validarCampos
    ],
    Controller.updateMedico
);
medicoRoutes.delete('/:id',
    validarJWT,
    Controller.deleteMedico
);

export default medicoRoutes;