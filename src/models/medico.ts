import { Schema, model } from 'mongoose';

const medico = {
    nombre: {
        type: String,
        required: true
    },
    img:{
        type:String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
};

const MedicoSchema = new Schema();
MedicoSchema.add(medico);

MedicoSchema.method('toJSON', function () {
    const { __v, ...Object } = this.toObject();
    return Object;
});

export const medicoModel = model('Medico', MedicoSchema);