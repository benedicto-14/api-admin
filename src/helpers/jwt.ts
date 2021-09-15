import jwt from 'jsonwebtoken';

export const generarJWT = (uid:string) => {
    
    return new Promise( (resolve, reject) => {

        const key:any = process.env.SECRET_JWT;

        const payload = {
            uid
        }

        jwt.sign(payload, key, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                //console.log(err);
                reject('No se genero el jwt');
            }else{
                resolve(token);
            }
        });

    });

}