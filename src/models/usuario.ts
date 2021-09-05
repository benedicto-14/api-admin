import { Schema, model, Document } from 'mongoose';
//import bcrypt from 'bcrypt';

// esquema del usuario
const user = {
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img:{
        type:String
    },
    role:{
        type:String,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    }
};

const UsuarioSchema = new Schema();
UsuarioSchema.add(user);
//Modifica el aspecto visual del get
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
});

export const userModel = model('Usuario', UsuarioSchema);

// crea el esquema
//const schemaUser = new Schema( user );

/* // metodo del esquema
schemaUser.method('compararPassword', function(password: string = ''): boolean{
    
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }

});

// interfaz usuario
interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    compararPassword(password: string):boolean;
}

export const userModel = model<IUsuario>('Usuario',schemaUser); */