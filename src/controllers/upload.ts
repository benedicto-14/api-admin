import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { actulizarImagen } from "../middlewares/actulizar-imagen";

export const loadFile = async (req:Request, res:Response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipo
    const tiposValidos = ['hospital', 'medico', 'usuario'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'tipos validos hospital | medico | usuario'
        });
    }

    //validar si existe archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'Ningun archivo fue cargado'
        });
    }

    //Precesar la imagen
    const file:any = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'tipos validos png | jpg | jpeg | gif'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Ruta para guardar de la imagen
    const path = `${ process.cwd() }/uploads/${ tipo }/${ nombreArchivo }`;
    
    //Mover la imagen
    file.mv(path, async (error:any) => {
        if(error){
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Error al mover imagen'
            });
        }

        //Actualizar bd
        await actulizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        });
    });
}

export const mostrarImagen = (req:Request, res:Response) => {
    
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = `${ process.cwd() }/uploads/${ tipo }/${ foto }`;

    //Imagen por defecto
    if( fs.existsSync(pathImg) ){
        res.sendFile(pathImg);
    }else{
        const pathImg = `${ process.cwd() }/uploads/no-img.png`;
        res.sendFile(pathImg);
    }

}