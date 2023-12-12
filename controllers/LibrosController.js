import { Libro } from "../models/Libro.js";
import {Autor} from "../models/Autor.js";
import {Genero} from "../models/Genero.js";

const findAllLibros = async (req, res) => {
    const libros = await Libro.findAll();
    const autores = await Autor.findAll();
    const generos = await Genero.findAll();

    return res.render('libros', {
        libros,
        autores,
        generos,
        edit: false,
        libroEdit: { titulo: null, genero_id: null, autor_id: null, precio: null, cantidad_stock: null, afiliado: null, fecha_publicacion: null, imagen: null, descripcion: null },
        showDelete: false,
        showSuccess: false,
        showDanger: false,
        alertMsg: null
    })
}

const findLibroById = async (req, res) => {
    const libroId = req.params.id;
    const libroEdit = await Libro.findByPk(libroId);
    const libros = await Libro.findAll();
    const autores = await Autor.findAll();
    const generos = await Genero.findAll();

    return res.render('libros', {
        libros,
        autores,
        generos,
        libroEdit,
        edit: true,
        showDelete: false,
        showSuccess: false,
        showDanger: false,
        showWarning: true,
        alertMsg: `Está editando el libro: ${libroId}`
    });
}

const createLibro = async (req, res) => {
    const { titulo, genero, autor, precio, stock, fecha, imagen, descripcion } = req.body;
    const libros = await Libro.findAll();
    const autores = await Autor.findAll();
    const generos = await Genero.findAll();

    if (titulo === undefined || titulo === null || titulo.trim() === '' ||
        generos === undefined || generos === null ||
        autores === undefined || autores === null ||
        precio === undefined || precio === null || precio.trim() === '' ||
        stock === undefined || stock === null || stock.trim() === '' ||
        fecha === undefined || fecha === null || fecha.trim() === '' ||
        // imagen === undefined || imagen === null || imagen.trim() === '' ||
        descripcion === undefined || descripcion === null || descripcion.trim() === '' ) {
        return res.render('libros', {
            libros,
            autores,
            generos,
            libroEdit: {titulo, generos, autores, precio, stock, fecha, imagen, descripcion},
            edit: false,
            showDelete: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para crear el registro.`
        });
    }

    await Libro.create({ titulo, genero_id: genero, autor_id: autor, precio, cantidad_stock: stock, fecha_publicacion: fecha, imagen: 'textodeprueba.jpg', descripcion, afiliado: 'Librería ABC' });
    res.redirect('/libros');
}

const updateLibroById = async (req, res) => {
    const libroId = req.params.id;
    const { titulo, genero, autor, precio, stock, fecha, imagen, descripcion } = req.body;

    const libroEdit = await Libro.findByPk(libroId);

    const libros = await Libro.findAll();
    const autores = await Autor.findAll();
    const generos = await Genero.findAll();

    if (titulo === undefined || titulo === null || titulo.trim() === '' ||
        generos === undefined || generos === null ||
        autores === undefined || autores === null ||
        precio === undefined || precio === null || precio.trim() === '' ||
        stock === undefined || stock === null || stock.trim() === '' ||
        fecha === undefined || fecha === null || fecha.trim() === '' ||
        imagen === undefined || imagen === null || imagen.trim() === '' ||
        descripcion === undefined || descripcion === null || descripcion.trim() === '' ) {
        return res.render('libros', {
            libros,
            autores,
            generos,
            libroEdit: {titulo, generos, autores, precio, stock, fecha, imagen, descripcion},
            edit: false,
            showDelete: false,
            showSuccess: false,
            showDanger: true,
            showWarning: false,
            alertMsg: `Debe completar todos los campos para modificar el registro.`
        });
    }

    libroEdit.titulo = titulo;
    libroEdit.generos = generos;
    libroEdit.autores = autores;
    libroEdit.precio = precio;
    libroEdit.stock = stock;
    libroEdit.fecha = fecha;
    // libroEdit.imagen = imagen;
    libroEdit.descripcion = descripcion;

    await libroEdit.save();
    return res.redirect('/libros');
}

const deleteLibroById = async (req, res) => {
    const libroId = req.params.id;
    const libroEdit = await Libro.findByPk(libroId);
    await libroEdit.destroy();
    res.redirect('/libros');
}

export {
    findAllLibros,
    findLibroById,
    createLibro,
    updateLibroById,
    deleteLibroById
}
