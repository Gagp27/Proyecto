/*
* Se importan las dependencias necesarias para el funcionamiento
* express es el motor del backend
* dot env es para leer el archivo de variables de entorno .env
* router es nuestra carpeta de direcciones routes/router.js
* connection es nuestra función que conecta la base de datos
*/
import express from 'express';
import "dotenv/config";
import router from './routes/router.js';
import { connection } from './config/db.js';

const app = express(); // inicializamos el servidor llamando a la función express

let isConnect = await connection(); // conectamos la base de datos
if (!isConnect) {
    console.log('No se ha podido conectar con ninguna base de datos');
}

/* Realizamos configuracíón del servidor */
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // indicamos la ruta de los archivos estaticos
app.use('/', router); // indicamos cual es el manejador de duras

// Asignamos un puerto en el que estará funcionando nuestro servidor
app.listen(3000, () => {
    console.log(`El Servidor esta funcionando`)
})