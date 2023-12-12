import {Libro} from "../models/Libro.js";

const inicio = async (req, res) => {
    const host = process.env.DATABASE_HOST;

    res.render('inicio', {
        host
    });
}

export {
    inicio
}