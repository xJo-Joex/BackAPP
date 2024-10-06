const fetch = require('node-fetch');

const generateBasicAuthHeader = () => {
    const SECRET_KEY_PAGO_PLUS = process.env.SECRET_KEY_PAGO_PLUS || "UGFnb1BsdXhBZG1pblByZTIwMjAlXzpQYWdvUGx1eEFwaV9QcmUwNF8yMDIwddd"
    console.log(process.env.SECRET_KEY_PAGO_PLUS);
    const token = generateToken(SECRET_KEY_PAGO_PLUS);
    return 'Basic ' + token;
};

function generateToken(secretKey) {
    let longitud = Math.random() * secretKey.length;
    let cadena = '';
    
    while (cadena.length < longitud) {
        cadena += secretKey.charAt(Math.floor(Math.random() * secretKey.length));
    }
    let tiempo = new Date();
    let number = tiempo.getTime() * 30;


    const tokenString = cadena + 'PPX_' + secretKey + 'PPX_' + number + 'AWS';

    return btoa(tokenString);
}



exports.validateTransaction = async (token, amount, date) => {
    const url = 'https://apipre.pagoplux.com/transv1/transaction/validationTokenDateResource';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': generateBasicAuthHeader() 
    };
    
    const body = JSON.stringify({ token, amount, date });

    try {
        const response = await fetch(url, { method: 'POST', headers, body });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Error al validar la transacción');
    }
};

