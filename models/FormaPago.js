import Sequelize from 'sequelize';
import { db } from '../config/db.js';

export const FormaPago = db.define('formas_de_pago', {
    forma_pago_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeValidate: async (formaPago, options) => {
            if (!formaPago.forma_pago_id) {
                formaPago.forma_pago_id = await getnextFormaPagoId();
            }
        },
    },
    tableName: 'formas_de_pago'
});

export const getnextFormaPagoId = async () => {
    try {
        const nextFormaPago = await FormaPago.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('forma_pago_id')), 'maxID']
            ]
        });

        const nextId = nextFormaPago ? parseInt(nextFormaPago.get('maxID')) + 1 : 1;
        console.log(nextId);
        return nextId;
    } catch (error) {
        console.error('Error al obtener la siguiente llave primaria:', error);
        throw error;
    }
};