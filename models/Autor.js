/*
    Mapeo de la tabla Autores en la base de datos se define cada una de las columnas y su tipo de dato, se debe pasar el objeto de la conexión.
    Por medio del hooks y la función getNextAutorId se desarrollo la logica que obtiene la siguiente llave para insertar.
 */
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