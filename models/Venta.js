import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const Venta = db.define('ventas', {
    venta_id: {
        type: Sequelize.NUMBER
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
});