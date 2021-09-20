import { Schema, model } from 'mongoose';

const hospital = {
    nombre: {
        type: String,
        required: true
    },
    img:{
        type:String
    },
    usuario:{
        require:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
};

const HospitalSchema = new Schema();
HospitalSchema.add(hospital);

HospitalSchema.method('toJSON', function () {
    const { __v, ...Object } = this.toObject();
    return Object;
});

export const hospitalModel = model('Hospital', HospitalSchema);