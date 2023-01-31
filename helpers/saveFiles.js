const fs = require('fs');

const archivo = './db/data.json';

const guardarDatos = (data) => {
    fs.writeFileSync (archivo, JSON.stringify(data)); //esta funcion de JSON convierte el arreglo en un JSON string
}

const leerDatos = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    //leer datos...
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'})
    
    //obteniendo un objeto a partir del string devuelto en info
    const data = JSON.parse(info);
    
    return data;
}

module.exports = {
    guardarDatos,
    leerDatos
}