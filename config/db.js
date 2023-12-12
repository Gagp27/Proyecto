import Sequelize from 'sequelize';

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