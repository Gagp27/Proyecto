import {db} from "../config/db.js";
import Sequelize from "sequelize";

export const VentaLibros = db.define('ventas_libros', {
    venta_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    libro_id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    cantidad: {
        type: Sequelize.NUMBER,
    },
    precio: {
        type: Sequelize.NUMBER,
    },
    precio_unitario: {
        type: Sequelize.STRING
    },
    itbms_por_libro: {
        type: Sequelize.NUMBER,
    },
}, {
    tableName: 'ventas_libros'
});