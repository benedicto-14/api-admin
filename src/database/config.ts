import mongoose from 'mongoose';

export async function conectarDB() {

    const url:any = process.env.DBSTRING;

    try {
        
        await mongoose.connect(url);
        console.log('DB conected');
        
        
    } catch (error) {
        console.log('DB fail');
    }
    

}