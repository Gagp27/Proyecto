import { Autor } from "../models/Autor.js";
import {Libro} from "../models/Libro.js";

const findAllAutores = async (req, res) => {
    const autores = await Autor.findAll();
    return res.render('autores', {
        autores,
        autorEdit: { nombre: null },
        edit: false,
        showDelete: false,
        showSuccess: false,
        showDanger: false,
        alertMsg: null
    })
}

const findAutorById = async (req, res) => {
    const autorId = req.params.id;
    const autores = await Autor.findAll();
    const autorEdit = await Autor.findByPk(autorId);
    const canDelete = await Libro.findOne({ where: { autor_id: autorId } });

    return res.render('autores', {
        autores,
        autorEdit,
        edit: true,
        showDelete: (!canDelete),
        showSuccess: false,
        showDanger: false,
        showWarning: true,
        alertMsg: `Está editando el autor: ${autorId}`
    })
}

const createAutor = async (req, res) => {
    const { nombre } = req.body;
    const autores = await Autor.findAll();

    if ( nombre === undefined || nombre === null || nombre.trim() === '') {
        return res.render('autores', {
            autores,
            autorEdit: { nombre },
            edit: false,
            showDelete: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para crear el registro.`
        })
    }

    await Autor.create({ nombre });
    res.redirect('/autores');
}

const updateAutorById = async (req, res) => {
    const autorId = req.params.id
    const { nombre } = req.body;
    const canDelete = await Libro.findOne({ where: { autor_id: autorId } });
    const autores = await Autor.findAll();
    const autorEdit = await Autor.findByPk(autorId);

    if ( nombre === undefined || nombre === null || nombre.trim() === '') {
        return res.render('autores', {
            autores,
            autorEdit: { nombre },
            edit: true,
            showDelete: (!canDelete),
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para modificar el registro.`
        });
    }

    autorEdit.nombre = nombre;
    await autorEdit.save();
    res.redirect('/autores');
}

const deleteAutorById = async (req, res) => {
    const autorId = req.params.id;
    const autorEdit = await Autor.findByPk(autorId);
    await autorEdit.destroy();
    res.redirect('/autores');
}

export {
    findAllAutores,
    findAutorById,
    createAutor,
    updateAutorById,
    deleteAutorById
}