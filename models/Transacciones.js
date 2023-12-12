import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const Transaccion = db.define('transacciones', {
    transaccion_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    venta_id: {
        type: Sequelize.NUMBER
    },
    total: {
        type: Sequelize.NUMBER
    },
    fecha: {
        type: Sequelize.DATE
    },
    forma_de_pago: {
        type: Sequelize.NUMBER
    },
    monto_pagado: {
        type: Sequelize.NUMBER
    },
    vuelto: {
        type: Sequelize.NUMBER
    },
    itbms: {
        type: Sequelize.NUMBER
    }
}, {
    hooks: {
        beforeValidate: async (transaccion, options) => {
            if (!transaccion.venta_id) {
                transaccion.venta_id = await getNextTransaccionId();
            }
        },
    },
});

export const getNextTransaccionId = async () => {
    try {
        const nextTransaccion = await Transaccion.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('libro_id')), 'maxID']
            ]
        });

        const nextId = nextTransaccion ? parseInt(nextTransaccion.get('maxID')) + 1 : 1;
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};