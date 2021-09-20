import fs from 'fs';
import { hospitalModel } from '../models/hospital';
import { medicoModel } from '../models/medico';
import { userModel } from '../models/usuario';

const borrarImagen = (model:any,tipo:string,nombre:string) => {
    if(!model){
        console.log('no existe registro con ese id');
        return false;
    }            

    const pathViejo = `${ process.cwd() }/uploads/${tipo}/${ model.img }`;
    if( fs.existsSync(pathViejo) ){
        //Borrar la imagen anterior
        fs.unlinkSync(pathViejo);
    }

    model.img = nombre;
}

export const actulizarImagen = async (tipo:string, id:string, nombreArchivo:string) => {
    
    switch (tipo) {
        case 'medico':

            const medico:any = await medicoModel.findById(id);
            borrarImagen(medico,tipo,nombreArchivo);
            await medico.save();
            return true;
            
        case 'hospital':

            const hospital:any = await hospitalModel.findById(id);
            borrarImagen(hospital,tipo,nombreArchivo);
            await hospital.save();
            return true;

        case 'usuario':

            const usuario:any = await userModel.findById(id);
            borrarImagen(usuario,tipo,nombreArchivo);
            await usuario.save();
            return true;
    
        default:
            return false;
    }

}