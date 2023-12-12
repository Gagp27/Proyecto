import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const Venta = db.define('ventas', {
    venta_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    cliente_id: {
        type: Sequelize.NUMBER
    },
    fecha_hora: {
        type: Sequelize.DATE
    },
    total: {
        type: Sequelize.NUMBER
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
        beforeValidate: async (venta, options) => {
            if (!venta.venta_id) {
                venta.venta_id = await getNextVentaId();
            }
        },
    },
});

export const getNextVentaId = async () => {
    try {
        const nextVenta = await Venta.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('venta_id')), 'maxID']
            ]
        });

        let nextId = nextVenta ? parseInt(nextVenta.get('maxID')) + 1 : 1;

        if (isNaN(nextId)) {
            nextId = 1;
        }
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};