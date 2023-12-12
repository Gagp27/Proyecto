import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const Autor = db.define('autores', {
    autor_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
},
{
    hooks: {
    beforeValidate: async (autor, options) => {
        if (!autor.autor_id) {
            // Si no se proporciona un autor_id, calcula y asigna el siguiente valor
            autor.autor_id = await getNextAutorId();
        }
    },
}});

export const getNextAutorId = async () => {
    try {
        const nextAutor = await Autor.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('autor_id')), 'maxAutorId']
            ]
        });

        const nextId = nextAutor ? parseInt(nextAutor.get('maxAutorId')) + 1 : 1;
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};