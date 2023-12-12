import express from 'express';
import { inicio } from '../controllers/PaginasController.js';
import { findAllAutores, findAutorById, updateAutorById, deleteAutorById, createAutor } from "../controllers/AutoresController.js";
import { findAllClientes, findClienteById, updateClienteById, deleteClienteById, createCliente } from "../controllers/ClientesController.js";
import { findAllFormasPago, findFormaPagoById, updateFormaPagoById, deleteFormaPagoById, createFormaPago } from "../controllers/FormasPagoController.js";
import { findAllGeneros, findGeneroById, updateGeneroById, deleteGeneroById, createGenero } from "../controllers/GenerosController.js";
import { findAllLibros, findLibroById, updateLibroById, deleteLibroById, createLibro } from "../controllers/LibrosController.js";



const router = express.Router();

// Rutas contenido estático
router.get('/', inicio);

// CRUD Cliente
router.get('/clientes', findAllClientes);
router.get('/clientes/:id', findClienteById);
router.post('/clientes', createCliente);
router.post('/clientes/:id', updateClienteById);
router.delete('/clientes/:id', deleteClienteById);

// CRUD Generos
router.get('/generos', findAllGeneros);
router.get('/generos/:id', findGeneroById);
router.post('/generos', createGenero);
router.post('/generos/:id', updateGeneroById);
router.get('/generos/delete/:id', deleteGeneroById);

//CRUD Autores
router.get('/autores', findAllAutores);
router.get('/autores/:id', findAutorById);
router.post('/autores', createAutor);
router.post('/autores/:id', updateAutorById);
router.get('/autores/delete/:id', deleteAutorById);

//CRUD Formas Pago
router.get('/formas-de-pago', findAllFormasPago);
router.get('/formas-de-pago/:id', findFormaPagoById);
router.post('/formas-de-pago', createFormaPago);
router.post('/formas-de-pago/:id', updateFormaPagoById);
router.get('/formas-de-pago/delete/:id', deleteFormaPagoById);

// CRUD Libros
router.get('/libros', findAllLibros);
router.get('/libros/:id', findLibroById);
router.post('/libros', createLibro);
router.post('/libros/:id', updateLibroById);
router.get('/libros/delete/:id', deleteLibroById);


export default router;