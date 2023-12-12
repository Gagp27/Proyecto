import express from 'express';
import router from './routes/router.js';
import { connection } from './config/db.js';

const app = express();


// // Conectar la base de datos 1
// let isConnect = await connection('104.196.101.85', 5432, 'yalabarca', '30252700', 'postgres');
//
// // Si no logró conectar con la base de datos 1 intenta con la 2
// if (!isConnect) {
//     isConnect = await connection('35.203.72.232', 5432, 'yalabarca', '30252700', 'postgres');
// }
//
// // Si no logró conectar con la base de datos 2 intenta con la 3
// if (!isConnect) {
//     isConnect = await connection('34.38.23.37', 5432, 'yalabarca', '30252700', 'postgres');
// }
//
// // Si no logró conectar con la base de datos 3 intenta con la 4
// if (!isConnect) {
//     isConnect = await connection('34.80.144.26', 5432, 'yalabarca', '30252700', 'postgres');
// }
//
// // No se ha podido conectar con ninguna base de datos.
// if (!isConnect) {
//     console.log('No se ha podido conectar con ninguna base de datos');
// }


let isConnect = await connection();
if (!isConnect) {
    console.log('No se ha podido conectar con ninguna base de datos');
}


app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', router);

app.listen(3000, () => {
    console.log(`El Servidor esta funcionando`)
})