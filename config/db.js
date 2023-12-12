/* Para realizar la conexión a la base de datos utilizamos el orm de SQL para Node.js Sequelize */
import Sequelize from 'sequelize';


// Creamos un nuevo objeto de sequelize el cual es la conexión a la base de datos aquí llamamos
// las variables de entorno definidas y realizamos configuración basica de conexión
export const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});


//Esta función permitirá autenticarnos en la base de datos, se llamará en el index.js
export const connection = async () => {
    try {
        await db.authenticate();
        console.log('Conexión exitosa');
        return true;
    } catch (error) {
        console.error('Error de conexión:', error);
        return false;
    }
};