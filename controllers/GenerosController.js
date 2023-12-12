import { Genero } from "../models/Genero.js";
import {Autor} from "../models/Autor.js";
import {Libro} from "../models/Libro.js";

const findAllGeneros = async (req, res) => {
    const generos = await Genero.findAll();
    return res.render('generos', {
        generos,
        generoEdit: { genero: null },
        edit: false,
        showDelete: false,
        showSuccess: false,
        showDanger: false,
        alertMsg: null
    })
}

const findGeneroById = async (req, res) => {
    const generoId = req.params.id;
    const generos = await Genero.findAll();
    const canDelete = await Libro.findOne({ where: { genero_id: generoId } });
    const generoEdit = await Genero.findByPk(generoId);

    return res.render('generos', {
        generos,
        generoEdit,
        showSuccess: false,
        edit: true,
        showDelete: (!canDelete),
        showDanger: false,
        showWarning: true,
        alertMsg: `Está editando el genero: ${generoId}`
    })
}

const createGenero = async (req, res) => {
    const { genero } = req.body;
    const generos = await Genero.findAll();

    if ( genero === undefined || genero === null || genero.trim() === '') {
        return res.render('generos', {
            generos,
            generoEdit: { genero },
            showDelete: false,
            edit: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para crear el registro.`
        })
    }

    await Genero.create({ genero });
    return res.redirect('/generos');
}

const updateGeneroById = async (req, res) => {
    const generoId = req.params.id;
    const { genero } = req.body;
    const generos = await Genero.findAll();
    const canDelete = await Libro.findOne({ where: { genero_id: generoId } });
    const generoEdit = await Genero.findByPk(generoId);

    if ( genero === undefined || genero === null || genero.trim() === '') {
        return res.render('generos', {
            generos,
            generoEdit: { genero },
            edit: false,
            showDelete: (!canDelete),
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para modificar el registro.`
        })
    }

    generoEdit.genero = genero;
    await generoEdit.save();
    return res.redirect('/generos');
}

const deleteGeneroById = async (req, res) => {
    const generoId = req.params.id;
    const generoEdit = await Genero.findByPk(generoId);
    await generoEdit.destroy();
    res.redirect('/generos');
}

export {
    findAllGeneros,
    findGeneroById,
    createGenero,
    updateGeneroById,
    deleteGeneroById
}
