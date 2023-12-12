import {Venta} from "../models/Venta.js";
import {VentaLibros} from "../models/VentaLibros.js";
import {Transaccion} from "../models/Transacciones.js";
import {DetalleVentaLibro} from "../models/DetalleVentaLibro.js";
import {Libro} from "../models/Libro.js";

const findAllVenta = async (req, res) => {
    const ventas = await Venta.findAll();
    return res.render('ventas', {
        ventas
    })
}

const findVentaById = async (req, res) => {
    const ventaId = req.params.id
    const venta = await Venta.findByPk(ventaId);
    const ventaLibro = await VentaLibros.findAll({ where: { venta_id: ventaId } })

    return res.render({
        venta,
        ventaLibro
    })
}

const createVenta = async (req, res) => {
}

const actualizarVenta = async (req, res) => {
}

const deleteVenta = async (req, res) => {
    const ventaId = req.params.id;
}

const paseHistorial = async (req, res) => {
    const ventaId = req.params.id;
    const ordenVenta = await Venta.findByPk(ventaId);
    const ventaLibros = await VentaLibros.findAll({ where: { venta_id: ventaId } })

    if (!ordenVenta) {
        return;
    }

    const transaccion = await Transaccion.create( {
        venta_id: ordenVenta.venta_id,
        total: ordenVenta.total,
        fecha: ordenVenta.fecha_hora,
        forma_de_pago: ordenVenta.forma_de_pago,
        monto_pagado: ordenVenta.monto_pagado,
        vuelto: ordenVenta.vuelto,
        itbms: ordenVenta.itbms
    });

    await ventaLibros.forEach( vl => {
        DetalleVentaLibro.create({
            transaccion: transaccion.transaccion_id,
            libro_id: vl.libro_id,
            cantidad: vl.cantidad,
            precio_unitario: vl.precio_unitario,
            itbms_por_libro: vl.itbms_por_libro,
            precio: vl.precio
        });

        const libroUpdate = Libro.findByPk(libro_id);
        libroUpdate.cantidad_stock = libroUpdate.cantidad_stock - vl.cantidad;
        libroUpdate.save();
    })
}

const finAllHistorial = async (req, res) => {
    const historial = await Transaccion.findAll();
    const detalle = await DetalleVentaLibro.findAll();

    return res.render('historial'), {
        historial,
        detalle
    }
}

export {
    findAllVenta,
    findVentaById,
    createVenta,
    actualizarVenta,
    deleteVenta,
    paseHistorial,
    finAllHistorial
}