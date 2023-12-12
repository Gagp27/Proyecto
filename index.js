import express from 'express';
import "dotenv/config";
import router from './routes/router.js';
import { connection } from './config/db.js';

const app = express();

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