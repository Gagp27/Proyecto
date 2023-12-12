import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const Genero = db.define('generos', {
    genero_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    genero: {
        type: Sequelize.STRING
    }
},
{
    hooks: {
        beforeValidate: async (genero, options) => {
            if (!genero.genero_id) {
                // Si no se proporciona un autor_id, calcula y asigna el siguiente valor
                genero.genero_id = await getNextGeneroId();
            }
        },
    }});

export const getNextGeneroId = async () => {
    try {
        const nextGenero = await Genero.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('genero_id')), 'maxID']
            ]
        });

        const nextId = nextGenero ? parseInt(nextGenero.get('maxID')) + 1 : 1;
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};