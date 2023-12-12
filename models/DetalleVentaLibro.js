import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const DetalleVentaLibro = db.define('detalle_ventas_libros', {
    detalle_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    transaccion_id: {
        type: Sequelize.NUMBER
    },
    libro_id: {
        type: Sequelize.NUMBER
    },
    cantidad: {
        type: Sequelize.NUMBER
    },
    precio_unitario: {
        type: Sequelize.NUMBER
    },
    itbms_por_libro: {
        type: Sequelize.NUMBER
    },
    precio: {
        type: Sequelize.NUMBER
    }
}, {
    hooks: {
        beforeValidate: async (detalle, options) => {
            if (!detalle.detalle_id) {
                detalle.detalle_id = await getNextDetalleId();
            }
        },
    },
});

export const getNextDetalleId = async () => {
    try {
        const nextDetalle = await DetalleVentaLibro.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('libro_id')), 'maxID']
            ]
        });

        const nextId = nextDetalle ? parseInt(nextDetalle.get('maxID')) + 1 : 1;
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};