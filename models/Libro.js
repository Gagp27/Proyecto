import Sequelize from 'sequelize';
import { db } from '../config/db.js';
import {FormaPago, getnextFormaPagoId} from "./FormaPago.js";

export const Libro = db.define('libros', {
    libro_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    genero_id: {
        type: Sequelize.NUMBER
    },
    autor_id: {
        type: Sequelize.NUMBER
    },
    precio: {
        type: Sequelize.NUMBER
    },
    cantidad_stock: {
        type: Sequelize.NUMBER
    },
    afiliado: {
        type: Sequelize.STRING
    },
    fecha_publicacion: {
        type: Sequelize.DATE
    },
    imagen: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeValidate: async (libro, options) => {
            if (!libro.libro_id) {
                libro.libro_id = await getNextLibroId();
            }
        },
    },
});

export const getNextLibroId = async () => {
    try {
        const nextLibro = await Libro.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('libro_id')), 'maxID']
            ]
        });

        const nextId = nextLibro ? parseInt(nextLibro.get('maxID')) + 1 : 1;
        console.log(nextId);
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};