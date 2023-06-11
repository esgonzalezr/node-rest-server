const { response } = require('express');

const userGet = (req, res = response) => {

    //De esta forma se capturan los parámetros de segmento
    //El nombre del param, debe ser el mismo del definido en la ruta del endpoint
    const id = req.params.id; //Este objeto puede desestructurarse { id } = req.params

    const { nombre, apellido } = req.query;

    res.json({
        msg: 'get Api - from Controller',
        id,
        nombre
    });
}
const userPost = (req, res = response) => {

    //De esta forma se captura el body del request
    const body = req.body;

    res.json({
        msg: 'post Api - from Controller',
        body
    });
}
const userPut = (req, res = response) => {
    res.json({
        msg: 'put Api - from Controller'
    });
}
const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - from Controller'
    });
}
const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api - from Controller'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}