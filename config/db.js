import Sequelize from 'sequelize';

export const db = new Sequelize('postgres', 'yalabarca', '30252700', {
    host: '104.196.101.85',
    port: 5432,
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