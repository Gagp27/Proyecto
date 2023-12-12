import { FormaPago } from "../models/FormaPago.js";

const findAllFormasPago = async (req, res) => {
    const formasPago = await FormaPago.findAll();
    return res.render('formas-pago', {
        formasPago,
        FormaPagoEdit: { nombre: null },
        edit: false,
        showDelete: false,
        showSuccess: false,
        showDanger: false,
        alertMsg: null
    })
}

const findFormaPagoById = async (req, res) => {
    const FormaPagoId = req.params.id;
    const formasPago = await FormaPago.findAll();
    const canDelete = false;
    const FormaPagoEdit = await FormaPago.findByPk(FormaPagoId);

    return res.render('formas-pago', {
        formasPago,
        FormaPagoEdit,
        edit: true,
        showDelete: (!canDelete),
        showSuccess: false,
        showDanger: false,
        showWarning: true,
        alertMsg: `Está editando el FormaPago: ${FormaPagoId}`
    })
}

const createFormaPago = async (req, res) => {
    const { nombre } = req.body;
    const formasPago = await FormaPago.findAll();

    if ( nombre === undefined || nombre === null || nombre.trim() === '') {
        return res.render('formas-pago', {
            formasPago,
            FormaPagoEdit: { nombre },
            edit: false,
            showDelete: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para crear el registro.`
        })
    }

    await FormaPago.create({ nombre });
    return  res.redirect('/formas-de-pago');
}

const updateFormaPagoById = async (req, res) => {
    const FormaPagoId = req.params.id;
    const { nombre } = req.body;
    const formasPago = await FormaPago.findAll();
    const canDelete = false;
    const FormaPagoEdit = await FormaPago.findByPk(FormaPagoId);

    if ( nombre === undefined || nombre === null || nombre.trim() === '') {
        return res.render('formas-pago', {
            formasPago,
            FormaPagoEdit: {nombre},
            edit: true,
            showSuccess: false,
            showDelete: (!canDelete),
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para modificar el registro.`
        })
    }

    FormaPagoEdit.nombre = nombre;
    await FormaPagoEdit.save();
    return res.redirect('/formas-de-pago');
}

const deleteFormaPagoById = async (req, res) => {
    const FormaPagoId = req.params.id;
    const FormaPagoEdit = await FormaPago.findByPk(FormaPagoId);
    await FormaPagoEdit.destroy();
    res.redirect('/formas-de-pago');
}

export {
    findAllFormasPago,
    findFormaPagoById,
    createFormaPago,
    updateFormaPagoById,
    deleteFormaPagoById
}
