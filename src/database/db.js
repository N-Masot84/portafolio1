import mysql from 'mysql2';

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nicopass',
    database: 'login',
});

conexion.connect((error) => {
    if (error) {
        console.log(`El error es: ${error}`);
        return;
    }
    console.log('Conectado a MySQL');
});

export default conexion;


