import {Venta} from "../models/Venta.js";
import {VentaLibros} from "../models/VentaLibros.js";
import {Transaccion} from "../models/Transacciones.js";
import {DetalleVentaLibro} from "../models/DetalleVentaLibro.js";
import {Libro} from "../models/Libro.js";
import {FormaPago} from "../models/FormaPago.js";
import {Cliente} from "../models/Cliente.js";

const findAllVenta = async (req, res) => {
    const ventas = await Venta.findAll();
    const formasPago = await FormaPago.findAll();
    const clientes = await Cliente.findAll();

    return res.render('ventas', {
        ventas,
        formasPago,
        clientes
    })
}

const findVentaById = async (req, res) => {
    const clientes = await Cliente.findAll();
    const formasPago = await FormaPago.findAll();
    const libros = await Libro.findAll();
    const ventaId = req.params.id
    const ventaEdit = await Venta.findByPk(ventaId);
    const ventaLibro = await VentaLibros.findAll({ where: { venta_id: ventaId } })

    return res.render('ventas2', {
        clientes,
        ventaEdit,
        ventaLibro,
        formasPago,
        edit: true,
        showDelete: true,
        showSuccess: false,
        showDange: false,
        alertMsg: null,
        showWarning: false,
        libros,
    })
}

const loadCreateOrdenVenta = async (req, res) => {
    const clientes = await Cliente.findAll();
    const formasPago = await FormaPago.findAll();
    const libros = await Libro.findAll();

    return res.render('ventas2', {
        clientes,
        ventaEdit: { venta_id: null },
        formasPago,
        edit: false,
        showDelete: false,
        showSuccess: false,
        showDange: false,
        alertMsg: null,
        showWarning: false,
        libros,
    })
}

const createVenta = async (req, res) => {
    const clientes = await Cliente.findAll();
    const formasPago = await FormaPago.findAll();
    const libros = await Libro.findAll();
    const { cliente, fecha, total, forma_de_pago, vuelto, itbms, monto_pagado } = req.body;
    const librosOrden = JSON.parse(req.body.cantidades);

    if (librosOrden.length === 0) {
        return res.render('ventas2', {
            clientes,
            ventaEdit: { cliente, fecha, total, forma_de_pago, vuelto, itbms, monto_pagado },
            formasPago,
            edit: false,
            showDelete: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: 'Debe completar todos los campos para crear el registro.',
            libros,
        })
    }


    if (cliente === undefined || cliente === null || cliente.trim() === '' ||
        fecha === undefined || fecha === null || fecha.trim() === '' ||
        total === undefined || total === null ||
        forma_de_pago === undefined || forma_de_pago === null || forma_de_pago.trim() === '' ||
        vuelto === undefined || vuelto === null || vuelto.trim() === '' ||
        itbms === undefined || itbms === null || itbms.trim() === '') {

        return res.render('ventas2', {
            clientes,
            ventaEdit: { cliente, fecha, total, forma_de_pago, vuelto, itbms, monto_pagado },
            formasPago,
            edit: false,
            showDelete: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: 'Debe completar todos los campos para crear el registro.',
            libros,
        })
    }

    const ventaa = await Venta.create({
        cliente_id: cliente,
        fecha_hora: fecha,
        total: total,
        forma_de_pago: forma_de_pago,
        monto_pagado: monto_pagado,
        vuelto: vuelto,
        itbms: itbms
    });

    for (const libro of librosOrden) {
        try {
            const libroObj = await Libro.findByPk(libro.libroId);

            await VentaLibros.create({
                venta_id: ventaa.venta_id,
                libro_id: libro.libroId,
                cantidad: libro.cantidad,
                precio: libroObj.precio * libro.cantidad,
                precio_unitario: libroObj.precio,
                itbms_por_libro: (libroObj.precio * libro.cantidad) + ((libroObj.precio * libro.cantidad) * 0.07)
            });

        } catch (error) {
            console.error('Error al procesar un libro:', error);
        }
    }

    res.redirect('/ventas');
}

const deleteVenta = async (req, res) => {
    const ventaId = req.params.id;
    const ordenVenta = await Venta.findByPk(ventaId);
    const ventaLibros = await VentaLibros.findAll({ where: { venta_id: ventaId } })

    for (const vl of ventaLibros) {
        await vl.destroy();
    }

    await ordenVenta.destroy();

    res.redirect('/ventas');
}

const paseHistorial = async (req, res) => {
    const ventaId = req.params.id;
    const ordenVenta = await Venta.findByPk(ventaId);
    const ventaLibros = await VentaLibros.findAll({ where: { venta_id: ventaId } })

    const transaccion = await Transaccion.create( {
        venta_id: ordenVenta.venta_id,
        total: ordenVenta.total,
        fecha: ordenVenta.fecha_hora,
        forma_de_pago: ordenVenta.forma_de_pago,
        monto_pagado: ordenVenta.monto_pagado,
        vuelto: ordenVenta.vuelto,
        itbms: ordenVenta.itbms
    });

    // Asumiendo que estás dentro de una función async
    for (const vl of ventaLibros) {
        // Crear un nuevo DetalleVentaLibro
        await DetalleVentaLibro.create({
            transaccion_id: transaccion.transaccion_id,
            libro_id: vl.libro_id,
            cantidad: vl.cantidad,
            precio_unitario: vl.precio_unitario,
            itbms_por_libro: vl.itbms_por_libro,
            precio: vl.precio
        });

        // Actualizar el stock del libro
        const libroUpdate = await Libro.findByPk(vl.libro_id);
        libroUpdate.cantidad_stock -= vl.cantidad;
        await libroUpdate.save();
        await vl.destroy();
    }

    await ordenVenta.destroy();
    res.redirect('/ventas');
}

const finAllHistorial = async (req, res) => {
    const historial = await Transaccion.findAll();
    const detalle = await DetalleVentaLibro.findAll();

    return res.render('historial', {
        historial,
        detalle
    });
}

export {
    findAllVenta,
    findVentaById,
    createVenta,
    deleteVenta,
    paseHistorial,
    finAllHistorial,
    loadCreateOrdenVenta
}